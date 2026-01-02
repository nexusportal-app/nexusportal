import {useEffect} from 'react'
import {useI18n} from '@infoportal/client-i18n'

export function useBeforeUnload(condition?: boolean, message?: string) {
  const {m} = useI18n()
  message = message || m.areYouSureToLeave
  useEffect(() => {
    if (!condition) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = message // required for Chrome
      return message
    }

    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [message, condition])
}
