import {Core} from '@/shared'
import {appConfig} from '../conf/AppConfig'
import {HttpError} from '@infoportal/api-sdk'

export const useIpToast = () => {
  const toasts = Core.useToast()
  return {
    ...toasts,
    toastHttpError: (e: unknown) => {
      const safeE = e as HttpError
      if ((safeE as any).message) toasts.toastError(safeE.message + ' ' + (safeE.errorId ?? ''))
      else toasts.toastError(`Something went wrong. Contact ${appConfig.contact}`)
    },
    toastAndThrowHttpError: (e: unknown) => {
      console.error(e)
      toasts.toastError(`Something went wrong. Contact ${appConfig.contact}`)
      throw e
    },
  }
}
