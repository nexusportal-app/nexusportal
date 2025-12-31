import {Api} from '@infoportal/api-sdk'
import {useXlsFormState} from '../table/XlsFormEditorContext'

export type CellPointer =
  | {table: 'survey'; rowKey: string; field: keyof Api.Form.Question; fieldIndex?: number}
  | {table: 'choices'; rowKey: string; field: keyof Api.Form.Choice; fieldIndex?: number}

export const useCell = <T extends boolean | string>({table, rowKey, field, fieldIndex}: CellPointer) => {
  const value = useXlsFormState(s => {
    const row: any | undefined = s.schema[table]!.find(_ => _.$kuid === rowKey)
    if (!row) return undefined

    const fieldValue = row[field]
    if (fieldIndex !== undefined && Array.isArray(fieldValue)) {
      return fieldValue[fieldIndex] as T
    }
    return fieldValue as T
  })

  const updateCells = useXlsFormState(s => s.updateCells)

  const onChange = (v: T | null) => {
    updateCells({table, rowKeys: [rowKey], field, value: v as any, fieldIndex})
  }

  return {value, onChange}
}
