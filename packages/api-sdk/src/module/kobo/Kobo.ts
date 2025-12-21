import type * as Prisma from '@infoportal/prisma'
import {Brand} from '../common/Common.js'
import {WorkspaceId} from '../workspace/Workspace.js'
import {Kobo as KoboSdk} from 'kobo-sdk'
import {FormId} from '../form/Form.js'

export namespace Kobo {
  export namespace Form {
    export type Info = Prisma.FormKoboInfo & {
      enketoUrl?: string
      deletedAt?: Date
      deletedBy?: string
      formId: FormId
      accountId: AccountId
      koboId: KoboSdk.FormId
    }
    export namespace Payload {
      export type Import = {
        workspaceId: WorkspaceId
        serverId: AccountId
        uid: KoboSdk.FormId
      }
    }
  }
  export type AccountId = Brand<string, 'accountId'>
  export type Account = Prisma.KoboAccount & {
    id: AccountId
    workspaceId: WorkspaceId
  }

  export namespace Account {
    export namespace Payload {
      export type Create = Omit<Account, 'id'>
    }
  }
}
