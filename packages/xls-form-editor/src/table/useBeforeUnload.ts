import {useEffect} from 'react'

export function useBeforeUnload(condition?: boolean, message = 'Are you sure you want to leave?') {
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
