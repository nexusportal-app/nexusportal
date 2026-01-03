import {PrismaClient} from '@infoportal/prisma'
import {genShortid, slugify, UUID} from '@infoportal/common'
import {Api} from '@infoportal/api-sdk'
import {prismaMapper} from '../../core/prismaMapper/PrismaMapper.js'
import {demoWorkspaceId} from '@infoportal/demo-workspace-init'

export class WorkspaceService {
  constructor(private prisma: PrismaClient) {}

  readonly checkSlug = async (name: string) => {
    const suggestedSlug = await this.getUniqSlug(name)
    return {
      isFree: name === suggestedSlug,
      suggestedSlug,
    }
  }

  private readonly getUniqSlug = async (name: string) => {
    const baseSlug = slugify(name)
    const existingSlugs = await this.prisma.workspace
      .findMany({
        select: {slug: true},
        where: {
          slug: {startsWith: baseSlug},
        },
      })
      .then(_ => _.map(_ => _.slug))
    const blockedValue = demoWorkspaceId
    existingSlugs.push(blockedValue)
    let slug = baseSlug
    while (existingSlugs.includes(slug)) {
      slug = `${baseSlug}-${genShortid()}`
    }
    return slug
  }

  readonly getByUser = async (email: Api.User.Email) => {
    return this.prisma.workspace
      .findMany({
        where: {
          OR: [
            {
              access: {
                some: {
                  user: {email},
                },
              },
            },
            {
              id: demoWorkspaceId,
            },
          ],
        },
        select: {
          id: true,
          createdAt: true,
          createdBy: true,
          name: true,
          slug: true,
          sector: true,
          access: {
            where: {
              user: {email},
            },
            select: {
              level: true,
            },
          },
        },
      })
      .then(workspaces =>
        workspaces.map(w =>
          prismaMapper.workspace.mapWorkspace({
            ...w,
            level: w.access[0]?.level ?? null,
          }),
        ),
      )
    // return this.prisma.workspaceAccess
    //   .findMany({
    //     where: {
    //       user: {
    //         email,
    //       },
    //     },
    //     select: {
    //       level: true,
    //       workspace: true,
    //     },
    //   })
    //   .then(_ => {
    //     return _.map(_ => {
    //       return {
    //         ..._.workspace,
    //         level: _.level,
    //       }
    //     })
    //   })
    //   .then(_ => _.map(prismaMapper.workspace.mapWorkspace))
  }

  readonly create = async (data: Api.Workspace.Payload.Create, user: Api.User) => {
    return this.prisma.workspace
      .create({
        data: {
          ...data,
          createdBy: user.email,
          access: {
            create: {
              createdBy: user.email,
              level: 'Admin',
              user: {
                connect: {
                  email: user.email,
                },
              },
            },
          },
        },
      })
      .then(prismaMapper.workspace.mapWorkspace)
  }

  readonly update = (id: UUID, data: Partial<Api.Workspace.Payload.Update>) => {
    return this.prisma.workspace
      .update({
        where: {id},
        data: data,
      })
      .then(prismaMapper.workspace.mapWorkspace)
  }

  readonly remove = async (id: UUID) => {
    await this.prisma.workspace.delete({
      where: {id},
    })
  }
}
