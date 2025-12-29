import {initContract} from '@ts-rest/core'
import {z} from 'zod'
import {makeMeta, schema} from '../../../helper/Schema.js'
import {Api} from '../../../Api.js'
import {map200, map204, TsRestClient} from '../../../ApiClient.js'

const c = initContract()

export const formActionContract = c.router({
  create: {
    method: 'POST',
    path: `/form/action/create`,
    body: c.type<Api.Form.Action.Payload.Create>(),
    responses: {
      200: c.type<Api.Form.Action>(),
    },
    metadata: makeMeta({
      access: {
        form: ['action_canCreate'],
      },
    }),
  },
  runAllActionsByForm: {
    method: 'POST',
    path: `/form/action/runAllActionsByForm`,
    body: z.object({
      workspaceId: schema.workspaceId,
      formId: schema.formId,
    }),
    responses: {
      200: c.type<Api.Form.Action.Report>(),
    },
    metadata: makeMeta({
      access: {
        form: ['action_canRun'],
      },
    }),
  },
  update: {
    method: 'POST',
    path: `/form/action/update`,
    body: c.type<Api.Form.Action.Payload.Update>(),
    responses: {
      200: c.type<Api.Form.Action>(),
    },
    metadata: makeMeta({
      access: {
        form: ['action_canUpdate'],
      },
    }),
  },
  remove: {
    method: 'POST',
    path: `/form/action/remove`,
    body: c.type<Api.Form.Action.Payload.Remove>(),
    responses: {204: schema.emptyResult},
    metadata: makeMeta({
      access: {
        form: ['action_canUpdate'],
      },
    }),
  },
  getByFormId: {
    method: 'POST',
    path: `/form/action/getByFormId`,
    body: z.object({
      workspaceId: schema.workspaceId,
      formId: schema.formId,
    }),
    responses: {
      200: c.type<Api.Form.Action[]>(),
    },
    metadata: makeMeta({
      access: {
        form: ['action_canRead'],
      },
    }),
  },
})

export const formActionClient = (client: TsRestClient) => {
  return {
    getByFormId: (body: {workspaceId: Api.WorkspaceId; formId: Api.FormId}): Promise<Api.Form.Action[]> => {
      return client.form.action
        .getByFormId({body})
        .then(map200)
        .then(_ => _.map(Api.Form.Action.map))
    },
    create: (body: Api.Form.Action.Payload.Create): Promise<Api.Form.Action> => {
      return client.form.action.create({body}).then(map200).then(Api.Form.Action.map)
    },
    update: (body: Api.Form.Action.Payload.Update): Promise<Api.Form.Action> => {
      return client.form.action.update({body}).then(map200).then(Api.Form.Action.map)
    },
    runAllActionsByForm: (body: Api.Form.Action.Payload.Run) => {
      return client.form.action.runAllActionsByForm({body}).then(map200).then(Api.Form.Action.Report.map)
    },
    remove: (body: Api.Form.Action.Payload.Remove) => {
      return client.form.action.remove({body}).then(map204)
    },
  }
}
