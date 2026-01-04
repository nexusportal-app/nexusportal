import {Api} from '@infoportal/api-sdk'

export type Session = {
  originalEmail?: string
  user: Api.User
}

export class SessionHelper {
  static readonly map = (_: any): Session => {
    return _
  }
}
