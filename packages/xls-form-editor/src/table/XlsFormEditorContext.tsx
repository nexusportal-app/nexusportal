import React, {ReactNode, useContext, useRef} from 'react'
import {useStore} from 'zustand'
import {createXlsStore, XlsFormState, XlsStore} from '../core/useStore'
import {Api} from '@infoportal/api-sdk'

const Context = React.createContext<XlsStore | null>(null)

export const XlsFormEditorProvider = ({value, children}: {value?: Api.Form.Schema; children: ReactNode}) => {
  const storeRef = useRef<XlsStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = createXlsStore(value)
  }

  return <Context.Provider value={storeRef.current}>{children}</Context.Provider>
}

export const useXlsFormState = <T,>(selector: (state: XlsFormState) => T): T => {
  const store = useContext(Context)
  if (!store) {
    throw new Error('XlsFormEditorProvider is missing')
  }
  return useStore(store, selector)
}
