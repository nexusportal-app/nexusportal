import * as Core from '@infoportal/client-core'
import {SelectSingle} from '@infoportal/client-core'
import {CellPointer, useCell} from '../core/useCell'
import {BoxProps, useTheme} from '@mui/material'
import {seq} from '@axanc/ts-utils'
import {useMemo} from 'react'
import {cellSelectSx} from './CellSelectType'
import {useXlsFormState} from '../table/XlsFormEditorContext'

export const SelectListName = ({
  value,
  onChange,
  ...props
}: {
  value?: string
  onChange: (_: string) => void
} & Omit<Core.SelectSingleNullableProps, 'options' | 'value' | 'onChange'>) => {
  const choices = useXlsFormState(s => s.schema.choices)

  const options = useMemo(() => {
    return seq(choices)
      ?.map(_ => _.list_name)
      .distinct(_ => _)
  }, [choices])

  return <SelectSingle<string> options={options} value={value} onChange={(value, e) => onChange(value!)} {...props} />
}

export const CellSelectListName = ({
  cellPointer,
  sx,
  ...props
}: Pick<BoxProps, 'sx'> & {
  cellPointer: CellPointer
}) => {
  const t = useTheme()
  const cell = useCell<string>(cellPointer)

  return (
    <SelectListName
      slotProps={{
        root: {
          sx: {
            height: '100%',
          },
        },
      }}
      sx={{
        ...(cellSelectSx as any),
        ...sx,
      }}
      value={cell.value}
      onChange={cell.onChange}
    />
  )
}
