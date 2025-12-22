import {BoxProps, useTheme} from '@mui/material'
import {CellPointer, useCell} from '../core/useCell'
import * as Core from '@infoportal/client-core'
import {SelectSingle} from '@infoportal/client-core'
import {useMemo} from 'react'
import {appearances} from '../core/settings'
import {Api} from '@infoportal/api-sdk'
import {cellSelectSx} from './CellSelectType'

export const SelectAppearance = ({
  value,
  onChange,
  questionType,
  ...props
}: {
  questionType?: Api.Form.QuestionType
  value?: string
  onChange: (_: string) => void
} & Omit<Core.SelectSingleNullableProps, 'options' | 'value' | 'onChange'>) => {
  const options = useMemo(() => {
    if (!questionType) return []
    return appearances.filter(_ => _.questionTypes.includes(questionType)).map(_ => _.name)
  }, [questionType])

  if (options.length === 0 && !!questionType) return
  return (
    <SelectSingle
      options={options}
      // disabled={!questionType}
      value={value}
      onChange={(value, e) => onChange(value!)}
      {...props}
    />
  )
}

export const CellSelectAppearance = ({
  cellPointer,
  sx,
  ...props
}: Pick<BoxProps, 'sx'> & {
  questionType?: Api.Form.QuestionType
  cellPointer: CellPointer
}) => {
  const t = useTheme()
  const cell = useCell<string>(cellPointer)
  return (
    <SelectAppearance
      slotProps={{
        root: {
          sx: {
            height: '100%',
          },
        },
      }}
      sx={{
        ...cellSelectSx as any,
        ...sx,
      }}
      value={cell.value}
      onChange={cell.onChange}
      {...props}
    />
  )
}
