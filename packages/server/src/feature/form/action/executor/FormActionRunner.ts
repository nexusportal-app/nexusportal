import {PrismaClient} from '@infoportal/prisma'
import {app, AppCacheKey} from '../../../../index.js'
import {IpEvent} from '@infoportal/common'
import {Api, HttpError} from '@infoportal/api-sdk'
import {FormActionService} from '../FormActionService.js'
import {SubmissionService} from '../../submission/SubmissionService.js'
import {FormActionRunningReportManager} from './FormActionRunningReportManager.js'
import {FormActionErrorHandler} from './FormActionErrorHandler.js'
import {Worker} from '@infoportal/form-action-runner'
import {chunkify, duration, seq} from '@axanc/ts-utils'
import {PromisePool} from '@supercharge/promise-pool'
import {appConf} from '../../../../core/AppConf.js'
import {FormSchemaService} from '../../FormSchemaService.js'
import {SubmissionMapperRuntime} from '@infoportal/form-helper'

export class FormActionRunner {
  private liveReport = FormActionRunningReportManager.getInstance(this.prisma)
  private errorHandler = new FormActionErrorHandler(this.prisma, app.logger('FormActionErrorHandler'))

  constructor(
    private prisma: PrismaClient,
    private schema = new FormSchemaService(prisma),
    private action = new FormActionService(prisma),
    private submission = new SubmissionService(prisma),
    private event = app.event,
    private log = app.logger('FormActionTriggerService'),
    private conf = appConf,
  ) {
  }

  readonly startListening = () => {
    this.log.info('Listening to Form Actions.')
    this.event.listen(IpEvent.SUBMISSION_NEW, _ => {
      this.runActionsByTriggeredForm(_).catch(e => this.errorHandler.handle(e, {formId: _.formId}))
    })
  }

  private findValidActions = app.cache.request({
    key: AppCacheKey.FormAction,
    genIndex: _ => _,
    cacheIf: _ => false, // disable for now, could lead to unexpected bugs
    ttlMs: duration(1, 'hour'),
    fn: async (formId: Api.FormId) => {
      return this.prisma.formAction
        .findMany({
          where: {
            OR: [{bodyErrors: null}, {bodyErrors: 0}],
            disabled: {not: true},
            targetFormId: formId,
          },
        })
        .then(_ => _.map(Api.Form.Action.map))
    },
  })

  readonly runAllActionByForm = async ({
    workspaceId,
    formId,
    startedBy,
  }: {
    startedBy: Api.User.Email
    workspaceId: Api.WorkspaceId
    formId: Api.FormId
  }): Promise<Api.Form.Action.Report> => {
    if (this.liveReport.has(formId)) {
      throw new HttpError.Conflict(`An execution is already running for ${formId}`)
    }

    const form = await this.prisma.form.findUnique({
      where: {id: formId},
      select: {workspaceId: true, type: true},
    })
    if (!form) {
      throw new HttpError.NotFound(`Form ${formId} not found`)
    }
    if (form.workspaceId !== workspaceId) {
      throw new HttpError.Forbidden(`Form ${formId} doesn't belong to Workspace ${workspaceId}`)
    }
    if (form.type !== 'smart') {
      throw new HttpError.BadRequest(`Cannot run actions on non-smart form ${formId}`)
    }

    const [actions] = await Promise.all([
      this.action.getActivesByForm({formId}),
      this.prisma.formSubmission.deleteMany({where: {formId}}),
    ])
    this.liveReport.start(formId, actions.length, startedBy)
    this.log.info(`Executing ${formId}: ${actions.length} actions...`)
    try {
      await PromisePool.withConcurrency(1)
        .for(actions)
        .process(async (action: Api.Form.Action) => {
          const schema = await this.schema.getOrThrowIndexedSchema(action.targetFormId)
          const submissions = await this.submission.searchAnswers({workspaceId, formId: action.targetFormId})
            .then(_ => _.data.map(_ => SubmissionMapperRuntime.map(schema, _)))

          this.log.info(
            `Executing ${formId}: Action ${action.id}: ${submissions.length} submissions from Form ${action.targetFormId}`,
          )
          await this.runActionOnSubmissions({workspaceId, formId, action, submissions: submissions})
          this.liveReport.update(formId, prev => ({
            actionExecuted: prev.actionExecuted + 1,
          }))
        })
      return await this.liveReport.finalize(formId)
    } catch (e) {
      await this.errorHandler.handle(e, {formId})
      return await this.liveReport.finalize(formId, (e as Error).message ?? 'Unknown error')
    }
  }

  private readonly runActionsByTriggeredForm = async ({
    formId,
    submission,
    workspaceId,
  }: {
    workspaceId: Api.WorkspaceId
    submission: Api.Submission
    formId: Api.FormId
  }) => {
    const [actions, schema] = await Promise.all([
      this.findValidActions(formId),
      this.schema.getOrThrowIndexedSchema(formId),
    ])
    const mappedSubmission = SubmissionMapperRuntime.map(schema, submission)
    this.log.info(`Run ${actions.length} actions for ${formId}.`)
    return Promise.all(
      actions
        .filter(a => !!a.body)
        .map(action => this.runActionOnSubmissions({workspaceId, action, formId, submissions: [mappedSubmission]})),
    )
  }

  private readonly runActionOnSubmissions = async ({
    workspaceId,
    action,
    submissions,
    formId,
  }: {
    formId: Api.FormId
    workspaceId: Api.WorkspaceId
    action: Api.Form.Action
    submissions: Api.Submission[]
  }) => {
    if (!action.body || action.disabled || submissions.length === 0) return

    if (action.type === 'insert') {
      try {
        const worker = new Worker()
        const jsCode = worker.transpile(action.body).outputText
        const results = await PromisePool.withConcurrency(Math.min(100, submissions.length))
          .for(submissions)
          .process(async s => {
            const res = await worker.run(jsCode, s)
            if (res.error) {
              throw new HttpError.BadRequest(`Failed to run action ${action.name} (${action.id}) on submission ${s.id}. ${JSON.stringify(res.error)}`)
            }
            return {output: res.result, submissionTime: s.submissionTime, submissionId: s.id}
          })
        if (results.errors.length > 0) throw new HttpError.InternalServerError(JSON.stringify(results.errors?.[0].message))

        const data = seq(results.results)
          .compactBy('output')
          .flatMap(({output, ...res}) => [output].flat().map(_ => ({output: _, ...res})))
          .get()

        await chunkify({
          data,
          concurrency: 1,
          size: this.conf.db.maxConcurrency,
          fn: async data => {
            await this.submission.createMany({
              skipDuplicates: false,
              data: data.map(d => ({
                id: SubmissionMapperRuntime.genId(),
                originId: d.submissionId,
                uuid: '',
                attachments: [],
                submissionTime: d.submissionTime,
                formId: action.formId,
                answers: d.output,
              })),
            })
            this.liveReport.update(formId, prev => ({
              submissionsExecuted: prev.submissionsExecuted + data.length,
            }))
          },
        })
      } catch (e) {
        const error = e as Error
        this.liveReport.update(formId, prev => ({...prev, failed: `${error.name}: ${error.message}`}))
        await this.errorHandler.handle(e, {formId, actionId: action.id})
      }
    }
  }
}
