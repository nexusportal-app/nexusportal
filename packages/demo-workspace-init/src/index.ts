import {Api} from '@infoportal/api-sdk'
import {Prisma, PrismaClient} from '@infoportal/prisma'
import {users} from './fixture/users.js'
import {rrm, rrmVersion} from './fixture/form-rrm.js'
import {mapFor} from '@axanc/ts-utils'
import {generateRandomSubmission} from './fixture/submissions-generator.js'
import {createdBySystem, demoWorkspaceId, workspace} from './fixture/workspace.js'

export {demoWorkspaceId} from './fixture/workspace.js'

export class DemoWorkspaceInit {
  constructor(private prisma: PrismaClient) {}

  readonly reset = async () => {
    await this.prisma.form.deleteMany({where: {workspaceId: demoWorkspaceId}})
    await this.prisma.user.deleteMany({where: {id: {in: users.map(_ => _.id)}}})
    await this.prisma.workspace.delete({where: {id: demoWorkspaceId}})
  }

  readonly init = async () => {
    await this.reset()
    await this.initWorkspace()
    await this.createUsers(users)
    await this.createWorkspaceAccess(users)
    await this.prisma.form.createMany({data: [rrm]})
    await this.prisma.formVersion.createMany({data: [rrmVersion]})
    await this.prisma.formSubmission.createMany({
      data: [...mapFor(10, _ => generateRandomSubmission(rrmVersion))],
    })
  }

  private readonly initWorkspace = async (): Promise<void> => {
    const exists = await this.prisma.workspace.count({where: {id: demoWorkspaceId}}).then(_ => _ > 0)
    if (!exists)
      await this.prisma.workspace.create({
        data: workspace,
      })
  }

  private readonly createUsers = async (users: Prisma.UserCreateInput[]) => {
    return this.prisma.user.createMany({
      data: users,
    })
  }

  private readonly createWorkspaceAccess = async (users: {id: string}[]) => {
    return users.map(_ =>
      this.prisma.workspaceAccess.createMany({
        data: users.map(_ => ({
          createdBy: createdBySystem,
          userId: _.id,
          workspaceId: demoWorkspaceId,
          level: Api.AccessLevel.Read,
        })),
      }),
    )
  }
}
