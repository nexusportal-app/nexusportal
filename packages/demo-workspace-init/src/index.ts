import {Api} from '@infoportal/api-sdk'
import {Prisma, PrismaClient} from '@infoportal/prisma'
import {jobTitle, users} from './fixture/users.js'
import {formRrmSchema, formRrmVersion, fromRrm} from './fixture/form-rrm.js'
import {generateRandomSubmissions} from './fixture/submissions-generator.js'
import {createdBySystem, demoWorkspaceId} from './utils.js'
import {workspace} from './fixture/workspace.js'
import {formHhs, formHhsSchema, formHssVersion} from './fixture/form-hhs.js'
import {dashboardPm, dashboardPmPublished, dashboardPmSection, dashboardPmWidgets} from './fixture/dashboard-pm.js'
import {formNta, formNtaSchema, formNtaVersion} from './fixture/form-shelter-nta.js'
import {formGlobal, formGlobalAction, formGlobalVersion} from './fixture/form-global.js'
import {dashboardGlobal, dashboardGlobalPublished, dashboardGlobalSection, dashboardGlobalWidgets} from './fixture/dashboard-global.js'

const forms = [fromRrm, formHhs, formNta, formGlobal]
const formsVersion = [formRrmVersion, formHssVersion, formNtaVersion, formGlobalVersion]

export class DemoWorkspaceInit {
  constructor(private prisma: PrismaClient) {
  }


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
    await this.prisma.form.createMany({data: forms})
    await this.prisma.formVersion.createMany({data: formsVersion})
    await Promise.all([
      this.createFormAccess(),
      this.prisma.formSubmission.createMany({
        data: [
          ...generateRandomSubmissions({
            formId: fromRrm.id as Api.FormId,
            schemaJson: formRrmSchema,
            version: formRrmVersion.version,
            count: 200,
            startDate: new Date(2024, 0, 1),
            endDate: new Date(2024, 11, 1),
          }),
          ...generateRandomSubmissions({
            numericRanges: {
              age: [0, 90],
              household_size: [1, 8],
            },
            version: formHssVersion.version,
            formId: formHhs.id as Api.FormId,
            schemaJson: formHhsSchema,
            count: 500,
            startDate: new Date(2024, 0, 1),
            endDate: new Date(2024, 11, 1),
          }),
          ...generateRandomSubmissions({
            numericRanges: {
              hh_char_hh_det_age: [0, 90],
              ben_det_hh_size: [1, 8],
            },
            version: formNtaVersion.version,
            formId: formNta.id as Api.FormId,
            schemaJson: formNtaSchema,
            count: 250,
            startDate: new Date(2024, 4, 1),
            endDate: new Date(2024, 11, 1),
          }),
        ],
      }),
      this.prisma.dashboard.createMany({
        data: [dashboardPm, dashboardGlobal],
      }),
      this.prisma.formAction.createMany({
        data: [...formGlobalAction],
      }),
    ])
    await this.prisma.dashboardPublished.createMany({
      data: [dashboardPmPublished, dashboardGlobalPublished],
    })
    await this.prisma.dashboardSection.createMany({
      data: [
        ...dashboardPmSection,
        ...dashboardGlobalSection,
      ],
    })
    await this.prisma.dashboardWidget.createMany({
      data: [
        ...dashboardPmWidgets,
        ...dashboardGlobalWidgets,
      ],
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
    return this.prisma.workspaceAccess.createMany({
      data: users.map(_ => ({
        createdBy: createdBySystem,
        userId: _.id,
        workspaceId: demoWorkspaceId,
        level: Api.AccessLevel.Admin,
      })),
    })
  }

  private createFormAccess = async () => {
    return this.prisma.formAccess.createMany({
      data: forms.map(form => ({
        createdBy: createdBySystem,
        formId: form.id,
        job: jobTitle,
        workspaceId: demoWorkspaceId,
        level: Api.AccessLevel.Admin,
      })),
    })
  }
}
