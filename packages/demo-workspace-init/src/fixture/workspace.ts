import {Api} from '@infoportal/api-sdk'

export const createdBySystem = 'SYSTEM'

export const demoWorkspaceId = '00000000-0000-0000-0000-000000000000' as Api.WorkspaceId

export const workspace = {
  id: demoWorkspaceId,
  createdBy: createdBySystem,
  slug: 'demo',
  name: 'Demo',
}
