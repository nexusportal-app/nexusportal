import {app, AppLogger} from '../../index.js'
import {apiContract, HttpError} from '@infoportal/api-sdk'
import {UserService} from '../../feature/user/UserService.js'
import {createExpressEndpoints, initServer} from '@ts-rest/express'
import {FormVersionService} from '../../feature/form/FormVersionService.js'
import {KoboFormService} from '../../feature/kobo/KoboFormService.js'
import {KoboAccountService} from '../../feature/kobo/KoboAccountService.js'
import {FormService} from '../../feature/form/FormService.js'
import {FormAccessService} from '../../feature/form/access/FormAccessService.js'
import {PermissionService} from '../../feature/PermissionService.js'
import {WorkspaceService} from '../../feature/workspace/WorkspaceService.js'
import {WorkspaceAccessService} from '../../feature/workspace/WorkspaceAccessService.js'
import {SubmissionService} from '../../feature/form/submission/SubmissionService.js'
import {WorkspaceInvitationService} from '../../feature/workspace/WorkspaceInvitationService.js'
import {MetricsService} from '../../feature/MetricsService.js'
import {GroupService} from '../../feature/group/GroupService.js'
import {GroupItemService} from '../../feature/group/GroupItemService.js'
import {FormActionService} from '../../feature/form/action/FormActionService.js'
import {FormActionLogService} from '../../feature/form/action/FormActionLogService.js'
import {FormActionRunner} from '../../feature/form/action/executor/FormActionRunner.js'
import {FormActionRunningReportManager} from '../../feature/form/action/executor/FormActionRunningReportManager.js'
import {FormActionReportService} from '../../feature/form/action/FormActionReportService.js'
import {DashboardService} from '../../feature/dashboard/DashboardService.js'
import {WidgetService} from '../../feature/dashboard/WidgetService.js'
import {SectionService} from '../../feature/dashboard/SectionService.js'
import {DatabaseView} from '../../feature/databaseView/DatabaseView.js'
import {SubmissionHistoryService} from '../../feature/form/history/SubmissionHistoryService.js'
import {PrismaClient} from '@infoportal/prisma/dist/index.js'
import {FormSchemaService} from '../../feature/form/FormSchemaService.js'
import {SubmissionUpdateService} from '../../feature/form/submission/SubmissionUpdateService.js'
import {AppConf, appConf} from '../../core/AppConf.js'
import * as core from 'express-serve-static-core'
import {Router} from './Router.js'

export class RoutesTsRest extends Router {
  constructor(
    protected server: core.Express,
    protected router: core.Router,
    protected prisma: PrismaClient,
    protected conf: AppConf = appConf,
    protected log: AppLogger = app.logger('RoutesExpress'),
  ) {
    super(prisma)
  }

  readonly register = () => {
    const workspace = new WorkspaceService(this.prisma)
    const workspaceAccess = new WorkspaceAccessService(this.prisma)
    const databaseView = new DatabaseView(this.prisma)
    const workspaceInvitation = new WorkspaceInvitationService(this.prisma)
    const koboForm = new KoboFormService(this.prisma)
    const koboAccount = new KoboAccountService(this.prisma)
    const form = new FormService(this.prisma)
    const schema = new FormSchemaService(this.prisma)
    const formVersion = new FormVersionService(this.prisma)
    const submission = new SubmissionService(this.prisma)
    const submissionUpdate = new SubmissionUpdateService(this.prisma)
    const submissionHistory = new SubmissionHistoryService(this.prisma)
    const group = new GroupService(this.prisma)
    const groupItem = new GroupItemService(this.prisma)
    const metrics = new MetricsService(this.prisma)
    const user = UserService.getInstance(this.prisma)
    const formAction = new FormActionService(this.prisma)
    const formActionRunner = new FormActionRunner(this.prisma)
    const formActionRunningReport = FormActionRunningReportManager.getInstance(this.prisma)
    const formActionReport = new FormActionReportService(this.prisma)
    const formActionLog = new FormActionLogService(this.prisma)
    const dashboard = new DashboardService(this.prisma)
    const section = new SectionService(this.prisma)
    const widget = new WidgetService(this.prisma)

    const s = initServer()
    const tsRestRouter = s.router(apiContract, {
      databaseView: {
        updateCol: _ =>
          this.auth(_)
            .then(({body, req}) => databaseView.updateCol({...body, updatedBy: req.session.app.user.email}))
            .then(this.ok200)
            .catch(this.handleError),
        search: _ =>
          this.auth(_)
            .then(({body}) => databaseView.search(body))
            .then(this.ok200)
            .catch(this.handleError),
        create: _ =>
          this.auth(_)
            .then(({body}) => databaseView.create(body))
            .then(this.ok200)
            .catch(this.handleError),
        update: _ =>
          this.auth(_)
            .then(({body}) => databaseView.update(body))
            .then(this.ok200)
            .catch(this.handleError),
        delete: _ =>
          this.auth(_)
            .then(({body}) => databaseView.delete(body))
            .then(this.ok200)
            .catch(this.handleError),
      },
      workspace: {
        getMine: _ =>
          this.auth(_)
            .then(({req}) => workspace.getByUser(req.session.app.user.email))
            .then(this.ok200)
            .catch(this.handleError),
        checkSlug: _ =>
          this.auth(_)
            .then(({body}) => workspace.checkSlug(body.slug))
            .then(this.ok200)
            .catch(this.handleError),
        create: _ =>
          this.auth(_)
            .then(({body, req}) => workspace.create(body, req.session.app.user))
            .then(this.ok200)
            .catch(this.handleError),
        update: _ =>
          this.auth(_)
            .then(({body, params}) => workspace.update(params.id, body))
            .then(this.ok200)
            .catch(this.handleError),
        remove: _ =>
          this.auth(_)
            .then(({params}) => workspace.remove(params.id))
            .then(this.ok204)
            .catch(this.handleError),
        invitation: {
          remove: _ =>
            this.auth(_)
              .then(({params}) => workspaceInvitation.remove(params))
              .then(this.ok204)
              .catch(this.handleError),
          create: _ =>
            this.auth(_)
              .then(({body, params, req}) =>
                workspaceInvitation.create({...body, ...params}, req.session.app.user.email),
              )
              .then(this.ok200)
              .catch(this.handleError),
          accept: _ =>
            this.auth(_)
              .then(({params, body}) => workspaceInvitation.accept({id: params.id, accept: body.accept}))
              .then(this.ok204)
              .catch(this.handleError),
          getMine: _ =>
            this.auth(_)
              .then(({req}) => workspaceInvitation.getByUser({user: req.session.app.user}))
              .then(this.ok200)
              .catch(this.handleError),
          search: _ =>
            this.auth(_)
              .then(({params}) => workspaceInvitation.getByWorkspace({workspaceId: params.workspaceId}))
              .then(this.ok200)
              .catch(this.handleError),
        },
        access: {},
      },
      group: {
        create: _ =>
          this.auth(_)
            .then(({params, body}) => group.create({...body, ...params}))
            .then(this.ok200)
            .catch(this.handleError),
        update: _ =>
          this.auth(_)
            .then(({params, body}) => group.update({...body, ...params}))
            .then(HttpError.throwNotFoundIfUndefined())
            .then(this.ok200)
            .catch(this.handleError),
        search: _ =>
          this.auth(_)
            .then(({params, body}) => group.search({...body, ...params}))
            .then(this.ok200)
            .catch(this.handleError),
        remove: _ =>
          this.auth(_)
            .then(({params}) => group.remove(params))
            .then(this.ok204)
            .catch(this.handleError),
        createItem: _ =>
          this.auth(_)
            .then(({body, params}) => groupItem.create({...body, ...params}))
            .then(this.ok200)
            .catch(this.handleError),
        deleteItem: _ =>
          this.auth(_)
            .then(({params}) => groupItem.remove(params))
            .then(this.ok204)
            .catch(this.handleError),
        updateItem: _ =>
          this.auth(_)
            .then(({params, body}) => groupItem.update({...body, ...params}))
            .then(HttpError.throwNotFoundIfUndefined())
            .then(this.ok200)
            .catch(this.handleError),
      },
      dashboard: {
        checkSlug: _ =>
          this.auth(_)
            .then(({body}) => dashboard.checkSlug(body.slug))
            .then(this.ok200)
            .catch(this.handleError),
        getProtectedSubmission: _ =>
          this.auth(_)
            .then(({body}) => dashboard.getProtectedSubmission(body))
            .then(this.ok200)
            .catch(this.handleError),
        search: _ =>
          this.auth(_)
            .then(({body}) => dashboard.getAll(body))
            .then(this.ok200)
            .catch(this.handleError),
        restorePublishedVersion: _ =>
          this.auth(_)
            .then(({body}) => dashboard.restorePublishedVersion(body))
            .then(this.ok204)
            .catch(this.handleError),
        getPublished: _ =>
          this.auth(_)
            .then(({body}) => dashboard.getPublished(body))
            .then(this.ok200)
            .catch(this.handleError),
        create: _ =>
          this.auth(_)
            .then(({body, req}) => dashboard.create({...body, createdBy: req.session.app.user.email}))
            .then(this.ok200)
            .catch(this.handleError),
        update: _ =>
          this.auth(_)
            .then(({body}) => dashboard.update(body))
            .then(this.ok200)
            .catch(this.handleError),
        remove: _ =>
          this.auth(_)
            .then(({body, req}) => dashboard.remove({...body, deletedBy: req.session.app.user.email}))
            .then(this.ok204)
            .catch(this.handleError),
        publish: _ =>
          this.auth(_)
            .then(({body, req}) => dashboard.publish({...body, publishedBy: req.session.app.user.email}))
            .then(this.ok204)
            .catch(this.handleError),
        section: {
          search: _ =>
            this.auth(_)
              .then(({body}) => section.search(body))
              .then(this.ok200)
              .catch(this.handleError),
          create: _ =>
            this.auth(_)
              .then(({body}) => section.create(body))
              .then(this.ok200)
              .catch(this.handleError),
          update: _ =>
            this.auth(_)
              .then(({body}) => section.update(body))
              .then(this.ok200)
              .catch(this.handleError),
          remove: _ =>
            this.auth(_)
              .then(({body}) => section.remove(body))
              .then(this.ok204)
              .catch(this.handleError),
        },
        widget: {
          search: _ =>
            this.auth(_)
              .then(({body}) => widget.search(body))
              .then(this.ok200)
              .catch(this.handleError),
          create: _ =>
            this.auth(_)
              .then(({body}) => widget.create(body))
              .then(this.ok200)
              .catch(this.handleError),
          update: _ =>
            this.auth(_)
              .then(({body}) => widget.update(body))
              .then(this.ok200)
              .catch(this.handleError),
          remove: _ =>
            this.auth(_)
              .then(({body}) => widget.remove(body))
              .then(this.ok204)
              .catch(this.handleError),
        },
      },
      user: {
        update: _ =>
          this.auth(_)
            .then(({params, body}) => user.updateByUserId({...body, ...params}))
            .then(this.ok200)
            .catch(this.handleError),
        search: _ =>
          this.auth(_)
            .then(({params}) => user.getAll(params))
            .then(this.ok200)
            .catch(this.handleError),
        getJobs: _ =>
          this.auth(_)
            .then(({params}) => user.getDistinctJobs(params))
            .then(this.ok200)
            .catch(this.handleError),
      },
      permission: {
        getMineGlobal: _ =>
          this.auth(_)
            .then(({req}) =>
              this.permission.getGlobal({
                user: req.session.app?.user,
              }),
            )
            .then(this.ok200)
            .catch(this.handleError),
        getMineByWorkspace: _ =>
          this.auth(_)
            .then(({params, req}) =>
              this.permission.getByWorkspace({
                user: req.session.app?.user,
                ...params,
              }),
            )
            .then(this.ok200)
            .catch(this.handleError),
        getMineByForm: _ =>
          this.auth(_)
            .then(({params, req}) =>
              this.permission.getByForm({
                user: req.session.app?.user,
                ...params,
              }),
            )
            .then(this.ok200)
            .catch(this.handleError),
      },

      kobo: {
        account: {
          delete: _ =>
            this.auth(_)
              .then(({params}) => koboAccount.delete({id: params.id}))
              .then(this.ok204)
              .catch(this.handleError),
          create: _ =>
            this.auth(_)
              .then(({params, body}) => koboAccount.create({workspaceId: params.workspaceId, ...body}))
              .then(this.ok200)
              .catch(this.handleError),
          getAll: _ =>
            this.auth(_)
              .then(({params}) => koboAccount.getAll(params))
              .then(this.ok200)
              .catch(this.handleError),
          get: _ =>
            this.auth(_)
              .then(({params}) => koboAccount.get(params))
              .then(this.okOrNotFound)
              .catch(this.handleError),
        },
        form: {
          import: _ =>
            this.auth(_)
              .then(({req, body}) =>
                koboForm.import({
                  ...body,
                  uploadedBy: req.session.app?.user.email!,
                }),
              )
              .then(this.ok200)
              .catch(this.handleError),
        },
      },
      submission: {
        submit: {
          middleware: [this.memoryUploader.array('file')],
          handler: ({params, body, req}) =>
            submission
              .submit({
                ...params,
                ...body,
                answers: JSON.parse(body.answers as unknown as string),
                attachments: req.files as unknown as Express.Multer.File[],
                author: req.session.app?.user?.email,
              })
              .then(this.ok200)
              .catch(this.handleError),
        },
        updateSingle: _ =>
          this.auth(_)
            .then(({req, body}) => submissionUpdate.updateSingle({...body, authorEmail: req.session.app.user.email!}))
            .then(this.ok200)
            .catch(this.handleError),
        bulkUpdateQuestion: _ =>
          this.auth(_)
            .then(({req, body}) =>
              submissionUpdate.bulkUpdateQuestion({...body, authorEmail: req.session.app.user.email!}),
            )
            .then(this.ok200)
            .catch(this.handleError),
        bulkUpdateValidation: _ =>
          this.auth(_)
            .then(({req, body}) =>
              submissionUpdate.bulkUpdateValidation({...body, authorEmail: req.session.app.user.email!}),
            )
            .then(this.ok200)
            .catch(this.handleError),

        remove: _ =>
          this.auth(_)
            .then(({req, params, body}) =>
              submissionUpdate.remove({...body, ...params, authorEmail: req.session.app.user.email!}),
            )
            .then(this.ok204)
            .catch(this.handleError),
        search: _ =>
          this.auth(_)
            .then(({req, params, body}) =>
              submission.searchAnswersByUsersAccess({
                ...body,
                ...params,
                user: req.session.app.user,
              }),
            )
            .then(this.ok200)
            .catch(this.handleError),
        history: {
          search: _ =>
            this.auth(_)
              .then(({body}) => submissionHistory.search(body))
              .then(this.ok200)
              .catch(this.handleError),
        },
      },
      form: {
        updateKoboConnexion: _ =>
          this.auth(_)
            .then(({params, body, req}) =>
              form.updateKoboConnexion({...params, ...body, author: req.session.app.user.email}),
            )
            .then(this.ok200)
            .catch(this.handleError),
        update: _ =>
          this.auth(_)
            .then(({params, body}) => form.update({...params, ...body}))
            .then(this.ok200)
            .catch(this.handleError),
        remove: _ =>
          this.auth(_)
            .then(({params}) => form.remove(params.formId))
            .then(this.ok204)
            .catch(this.handleError),
        getAll: _ =>
          this.auth(_)
            .then(({params}) => form.getAll({wsId: params.workspaceId}))
            .then(this.ok200)
            .catch(this.handleError),
        getMine: _ =>
          this.auth(_)
            .then(({params, req}) => form.getByUser({user: req.session.app.user, workspaceId: params.workspaceId}))
            .then(this.ok200)
            .catch(this.handleError),
        get: ({params}) => form.get(params.formId).then(this.okOrNotFound).catch(this.handleError),
        create: _ =>
          this.auth(_).then(({req, body, params}) =>
            form
              .create({
                uploadedBy: req.session.app?.user.email!,
                workspaceId: params.workspaceId,
                ...body,
              })
              .then(this.ok200)
              .catch(this.handleError),
          ),
        refreshAll: _ =>
          this.auth(_)
            .then(({req, params}) =>
              koboForm.refreshAll({
                byEmail: req.session.app?.user.email!,
                wsId: params.workspaceId,
              }),
            )
            .then(this.ok200)
            .catch(this.handleError),
        schema: {
          get: ({body}) => schema.get({formId: body.formId}).then(this.ok200).catch(this.handleError),
          getXml: ({body}) => schema.getXml({formId: body.formId}).then(this.ok200).catch(this.handleError),
          getByVersion: _ =>
            this.auth(_)
              .then(({body}) => schema.getByVersion({formId: body.formId, versionId: body.versionId}))
              .then(this.ok200)
              .catch(this.handleError),
          getByVersionXml: _ =>
            this.auth(_)
              .then(({body}) => schema.getByVersionXml({formId: body.formId, versionId: body.versionId}))
              .then(this.ok200)
              .catch(this.handleError),
        },
        access: {
          create: _ =>
            this.auth(_)
              .then(({params, body}) => this.formAccess.create({...params, ...body}))
              .then(this.ok200)
              .catch(this.handleError),
          update: _ =>
            this.auth(_)
              .then(({params, body}) => this.formAccess.update({...params, ...body}))
              .then(this.ok200)
              .catch(this.handleError),
          remove: _ =>
            this.auth(_)
              .then(({req, params}) =>
                this.formAccess.remove({id: params.id, deletedByEmail: req.session.app.user.email}),
              )
              .then(this.ok204)
              .catch(this.handleError),
          search: _ =>
            this.auth(_)
              .then(({params, body, req}) =>
                this.formAccess.search({formId: body.formId, workspaceId: params.workspaceId}),
              )
              .then(this.ok200)
              .catch(this.handleError),
          searchMine: _ =>
            this.auth(_)
              .then(({params, req, body}) =>
                this.formAccess.search({
                  formId: body.formId,
                  workspaceId: params.workspaceId,
                  user: req.session.app.user,
                }),
              )
              .then(this.ok200)
              .catch(this.handleError),
        },
        version: {
          validateXlsForm: {
            middleware: [this.diskUploader.single('file')],
            handler: _ =>
              this.auth(_)
                .then(this.ensureFile)
                .then(({file}) => formVersion.validateXlsForm(file.path))
                .then(this.ok200)
                .catch(this.handleError),
          },
          uploadXlsForm: {
            middleware: [this.diskUploader.single('file')],
            handler: _ =>
              this.auth(_)
                .then(this.ensureFile)
                .then(({file, req, params}) =>
                  formVersion.uploadXlsForm({
                    ...params,
                    uploadedBy: req.session.app.user.email,
                    file,
                  }),
                )
                .then(this.ok200)
                .catch(this.handleError),
          },
          getByFormId: _ =>
            this.auth(_)
              .then(({body}) => formVersion.getVersions({formId: body.formId}))
              .then(this.ok200)
              .catch(this.handleError),
          createNewVersion: _ =>
            this.auth(_)
              .then(({body, req}) => formVersion.createNewVersion({...body, uploadedBy: req.session.app.user.email}))
              .then(this.ok200)
              .catch(this.handleError),
          deployLast: _ =>
            this.auth(_)
              .then(({req, body}) => formVersion.deployLastDraft({formId: body.formId}))
              .then(this.ok200)
              .catch(this.handleError),
          importLastKoboSchema: _ =>
            this.auth(_)
              .then(({req, body}) => formVersion.importLastKoboSchema({author: req.session.app.user.email, ...body}))
              .then(this.ok200)
              .catch(this.handleError),
        },
        action: {
          create: _ =>
            this.auth(_)
              .then(({params, body, req}) =>
                formAction.create({...params, ...body, createdBy: req.session.app.user.email}),
              )
              .then(this.ok200)
              .catch(this.handleError),
          update: _ =>
            this.auth(_)
              .then(({params, body, req}) =>
                formAction.update({...params, ...body, createdBy: req.session.app.user.email}),
              )
              .then(this.ok200)
              .catch(this.handleError),
          getByDbId: _ =>
            this.auth(_)
              .then(({params}) => formAction.getByForm(params))
              .then(this.ok200)
              .catch(this.handleError),
          runAllActionsByForm: _ =>
            this.auth(_)
              .then(({params, req}) =>
                formActionRunner.runAllActionByForm({...params, startedBy: req.session.app.user.email}),
              )
              .then(this.ok200)
              .catch(this.handleError),
          report: {
            getByFormId: _ =>
              this.auth(_)
                .then(({params}) => formActionReport.getByFormId(params))
                .then(this.ok200)
                .catch(this.handleError),
            getRunning: _ =>
              this.auth(_)
                .then(({params}) => formActionRunningReport.get(params.formId))
                .then(this.okOrNotFound)
                .catch(this.handleError),
          },
          log: {
            search: _ =>
              this.auth(_)
                .then(({params, body}) => formActionLog.search({...params, ...body}))
                .then(this.ok200)
                .catch(this.handleError),
          },
        },
      },
      metrics: {
        getUsersByDate: _ =>
          this.auth(_)
            .then(({req, body}) => metrics.usersByDate({user: req.session.app.user, ...body}))
            .then(this.ok200)
            .catch(this.handleError),
        getSubmissionsBy: _ =>
          this.auth(_)
            .then(({req, body}) => metrics.submissionsBy({user: req.session.app.user, ...body}))
            .then(this.ok200)
            .catch(this.handleError),
      },
    })
    createExpressEndpoints(apiContract, tsRestRouter, this.server, {logInitialization: false})
  }
}
