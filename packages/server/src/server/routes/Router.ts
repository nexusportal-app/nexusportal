import {NextFunction, Request, Response} from 'express'
import {HttpError, Meta} from '@infoportal/api-sdk'
import {AuthRequest} from '../../typings/index.js'
import {ErrorHttpStatusCode, SuccessfulHttpStatusCode} from '@ts-rest/core'
import multer from 'multer'
import {PermissionService} from '../../feature/PermissionService.js'
import {PrismaClient} from '@infoportal/prisma'
import {FormAccessService} from '../../feature/form/access/FormAccessService.js'
import {app, AppLogger} from '../../index.js'

interface HandlerArgs<TReq = Request, TParams = any, TBody = any, TQuery = any> {
  req: TReq
  query?: TQuery
  res: Response
  params?: TParams
  body?: TBody
  headers: any
  file?: unknown //Express.Multer.File
  files?: unknown //Express.Multer.File[]
}

type ErrBody = {message: string; data?: object}

export class Router {
  protected constructor(
    protected prisma: PrismaClient,
    protected formAccess = new FormAccessService(prisma),
    protected permission = new PermissionService(prisma, undefined, formAccess),
    protected log: AppLogger = app.logger('Routes'),
  ) {}

  readonly assertAuth = async (req: Request, meta?: Meta): Promise<void> => {
    //req.session.app.user = {
    //   email: 'alexandre.annic@drc.ngo',
    //   admin: true,
    // } as any
    // next()
    const connectedUser = await this.permission.checkUserConnected(req)
    if (!connectedUser) {
      throw new HttpError.Forbidden('User not connected.')
    }
    if (meta) {
      const permissions = meta.access
      const hasPermission = await this.permission.hasPermission({req: req, permissions, connectedUser})
      if (!hasPermission) throw new HttpError.Forbidden(`Permissions does not match`, {permissions})
    }
  }

  readonly authMiddleware = (meta?: Meta) => async (req: Request, res: Response, next: NextFunction) => {
    this.assertAuth(req, meta).then(next).catch(next)
  }

  readonly auth = async <T extends HandlerArgs>(args: T): Promise<Omit<T, 'req'> & {req: AuthRequest<T['req']>}> => {
    this.assertAuth(args.req, (args.req as any).tsRestRoute.metadata)
    return args as any
  }

  readonly ok200 = <T>(body: T): {status: SuccessfulHttpStatusCode; body: T} => {
    return {
      status: 200,
      body: body as T,
    }
  }

  readonly ok204 = <T>(body: T): {status: 204; body: undefined} => {
    return {
      status: 204,
      body: {} as unknown as undefined,
    }
  }

  readonly notFound = (): {status: ErrorHttpStatusCode; body: ErrBody} => {
    return {status: 404, body: {message: 'Resource not found'}}
  }

  readonly okOrNotFound = <T>(
    body: T | undefined,
  ): T extends undefined ? {status: 404; body: ErrBody} : {status: SuccessfulHttpStatusCode; body: T} => {
    // @ts-ignore
    return body ? this.ok200(body) : this.notFound()
  }

  readonly handleError = (e: Error): {status: ErrorHttpStatusCode; body: ErrBody} => {
    const statusMap = new Map<Function, ErrorHttpStatusCode>([
      [HttpError.Conflict, 409],
      [HttpError.Forbidden, 403],
      [HttpError.NotFound, 404],
    ])

    const status = Array.from(statusMap.entries()).find(([ErrClass]) => e instanceof ErrClass)?.[1] ?? 500

    this.log.error(status + ':' + e.name + ' - ' + e.message)
    console.error(e)
    return {
      status,
      body: {
        message: e.message,
        data: (e as any)?.data,
      },
    }
  }

  readonly ensureFile = <T extends HandlerArgs>(args: T): Promise<T & {file: Express.Multer.File}> => {
    return new Promise((resolve, reject) => {
      if (!args.req.file) {
        return reject(new HttpError.BadRequest('Missing file.'))
      }
      return resolve(args as any)
    })
  }

  readonly diskUploader = multer({dest: 'uploads/'})
  readonly memoryUploader = multer({
    storage: multer.memoryStorage(),
  })
}
