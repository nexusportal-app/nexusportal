import {NextFunction, Request, Response} from 'express'
import * as yup from 'yup'
import {PrismaClient} from '@infoportal/prisma'
import {SessionService} from '../../feature/session/SessionService.js'
import {Api, HttpError} from '@infoportal/api-sdk'
import {isVisitorAccount} from '@infoportal/demo-workspace-init/utils'

export class ControllerSession {
  constructor(
    private prisma: PrismaClient,
    private service = new SessionService(prisma),
  ) {
  }

  readonly getMe = async (req: Request, res: Response, next: NextFunction) => {
    // if (req.hostname.startsWith('localhost') || req.hostname.startsWith('192')) {
    //   const user = await this.prisma.user.findFirstOrThrow({where: {email: this.conf.ownerEmail}})
    //   req.session.app = {user: user as any}
    // }
    // if (!isAuthenticated(req)) throw new HttpError.Forbidden('No access.')
    const user = await this.service.get(req.session.app!.user)
    res.send({user, originalEmail: req.session.app?.originalEmail})
  }

  readonly logout = async (req: Request, res: Response, next: NextFunction) => {
    req.session.app = undefined
    res.send()
  }

  readonly login = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = await yup
      .object({
        name: yup.string().required(),
        username: yup.string().required(),
        accessToken: yup.string().required(),
        provider: yup.string().oneOf(['google', 'microsoft']).required(),
      })
      .validate(req.body)
    const user = await this.service.login(userInfo)
    req.session.app = {user}
    res.send({user})
  }

  readonly revertConnectAs = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.service.revertConnectAs(req.session.app?.originalEmail)
    req.session.app = {user}
    res.send({user})
  }

  readonly connectAs = async (req: Request, res: Response, next: NextFunction) => {
    const body = await yup
      .object({
        email: yup.string().required(),
      })
      .validate(req.body)
    const emailToSpy = body.email as Api.User.Email
    const connectedUser = req.session.app!.user
    const spyUser = await this.service.getSpyUser({
      spyEmail: emailToSpy,
      connectedUser,
    })
    if (isVisitorAccount(spyUser) || connectedUser!.accessLevel === Api.AccessLevel.Admin) {
      req.session.app = {
        user: spyUser,
        originalEmail: connectedUser.email,
      }
      res.send(req.session.app)
    } else {
      throw new HttpError.Forbidden(`Cannot connected as ${emailToSpy}.`)
    }
  }

  readonly track = async (req: Request, res: Response, next: NextFunction) => {
    const body = await yup
      .object({
        detail: yup.string().optional(),
      })
      .validate(req.body)
    await this.service.saveActivity({email: req.session.app?.user.email ?? 'not_connected', detail: body.detail})
    res.send()
  }
}
