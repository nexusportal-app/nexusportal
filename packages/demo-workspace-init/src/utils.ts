import {Api} from '@infoportal/api-sdk'

export const createdBySystem = 'SYSTEM'

export const demoWorkspaceId = '00000000-0000-0000-0000-000000000000' as Api.WorkspaceId

export const isVisitorEmail = (email: string) => {
  return email.startsWith('visitor.') && email.endsWith('@nexusportal.app')
}

export const isVisitorAccount = (user: {email: string, id: string}) => {
  return user.id.startsWith('00000000-0000') && isVisitorEmail(user.email)
}