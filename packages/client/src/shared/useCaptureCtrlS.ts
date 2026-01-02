import {useEffect} from 'react'

export function useCaptureCtrlS(action: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e, e.ctrlKey, e.metaKey, e.key)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        action()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [action])
}
