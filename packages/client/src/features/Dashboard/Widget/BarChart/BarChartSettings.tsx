import {useI18n} from '@infoportal/client-i18n'
import {Controller, useForm, useWatch} from 'react-hook-form'
import {Api} from '@infoportal/api-sdk'
import React, {useEffect, useMemo} from 'react'
import {Box} from '@mui/material'
import {getQuestionTypeByWidget, useQuestionInfo, useWidgetSettingsContext} from '@/features/Dashboard/Widget/WidgetSettingsPanel'
import {SelectQuestionInput} from '@/shared/customInput/SelectQuestionInput'
import {WidgetSettingsFilterQuestion} from '@/features/Dashboard/Widget/shared/WidgetSettingsFilter'
import {WidgetSettingsSection} from '@/features/Dashboard/Widget/shared/WidgetSettingsSection'
import {useDashboardContext} from '@/features/Dashboard/Context/DashboardContext'
import {SwitchBox} from '@/shared/customInput/SwitchBox'
import {useEffectSetTitle} from '@/features/Dashboard/Widget/shared/useEffectSetTitle'
import {SliderNumberInput} from '@/shared/customInput/SliderNumberInput'
import {BarChartSettingsMapping} from '@/features/Dashboard/Widget/BarChart/BarChartSettingsMapping'
import {seq} from '@axanc/ts-utils'
import {Datatable} from '@/shared'

export const encodeStringName = (_?: string) => _ !== undefined && _ !== '' ? '_' + encodeURIComponent(_) : Datatable.Utils.blank

export function BarChartSettings() {
  const {m} = useI18n()
  const langIndex = useDashboardContext(_ => _.langIndex)
  const schema = useDashboardContext(_ => _.schemaInspector)
  const data = useDashboardContext(_ => _.data.source)
  const flattenRepeatGroupData = useDashboardContext(_ => _.flattenRepeatGroupData)
  const {widget, onChange} = useWidgetSettingsContext()
  const config = widget.config as Api.Dashboard.Widget.Config['BarChart']
  const {choices} = useQuestionInfo(config.questionName)
  const form = useForm<Api.Dashboard.Widget.Config['BarChart']>({
    mode: 'onChange',
    defaultValues: {
      ...widget.config,
      showEvolution: config.showEvolution ?? true,
    },
  })

  useEffectSetTitle(config.questionName)

  const options: Api.Form.Choice[] | undefined = useMemo(() => {
    const qName = config.questionName
    if (!qName) return
    if (choices && choices.length > 0) {
      const empty: Api.Form.Choice = {
        list_name: choices[0].list_name,
        label: new Array(schema.schema.translations.length).fill(''),
        $kuid: 'empty_',
        name: '',
      }
      return [empty, ...choices]
    }
    const question = schema.lookup.questionIndex[qName]
    if (!question) return
    if (question.type === 'text') {
      const flattenData = flattenRepeatGroupData.flattenIfRepeatGroup(data, qName)
      return seq(flattenData).map(_ => _[qName]).distinct(_ => _).map(value => {
        return {
          list_name: qName,
          $kuid: value,
          name: encodeStringName(value),
          label: new Array(schema.schema.translations.length).fill(value),
        } as Api.Form.Choice
      })
    }
  }, [choices, schema, config.minValue, config.questionName, flattenRepeatGroupData, data])

  const values = useWatch({control: form.control})

  useEffect(() => {
    onChange({config: values})
  }, [values])

  return (
    <Box>
      <WidgetSettingsSection title={m.source}>
        <Controller
          name="questionName"
          control={form.control}
          rules={{
            required: true,
          }}
          render={({field, fieldState}) => (
            <SelectQuestionInput
              {...field}
              sx={{mb: 1}}
              onChange={(e, _) => field.onChange(_)}
              inspector={schema}
              questionTypeFilter={getQuestionTypeByWidget(widget.type)}
              InputProps={{
                label: m.question,
                error: !!fieldState.error,
                helperText: null,
              }}
            />
          )}
        />
        <WidgetSettingsFilterQuestion name="filter" form={form} sx={{mb: 1}} />
      </WidgetSettingsSection>
      <WidgetSettingsSection title={m.customize}>
        <Controller
          name="limit"
          control={form.control}
          render={({field, fieldState}) => (
            <SliderNumberInput
              {...field}
              label={m._dashboard.listLimit}
              value={field.value ?? choices?.length}
              onChange={(e, value) => {
                if (choices && value === choices?.length) field.onChange(null)
                else field.onChange(value)
              }}
              defaultValue={choices?.length}
              max={choices?.length}
              sx={{mb: 1}}
            />
          )}
        />
        <Controller
          name="minValue"
          control={form.control}
          render={({field, fieldState}) => (
            <SliderNumberInput
              {...field}
              label={m._dashboard.minValue}
              value={field.value ?? 2}
              onChange={(e, value) => {
                if (choices && value === choices?.length) field.onChange(null)
                else field.onChange(value)
              }}
              defaultValue={choices?.length ?? 2}
              min={0}
              sx={{mb: 1}}
            />
          )}
        />
        <Controller
          name="showEvolution"
          control={form.control}
          render={({field, fieldState}) => (
            <SwitchBox
              checked={field.value}
              onChange={(e, checked) => field.onChange(checked)}
              size="small"
              label={m._dashboard.showEvolution}
              sx={{mb: 1}}
            />
          )}
        />
        <Controller
          name="showValue"
          control={form.control}
          render={({field}) => (
            <SwitchBox
              checked={field.value}
              onChange={(e, checked) => field.onChange(checked)}
              size="small"
              label={m._dashboard.showValue}
              sx={{mb: 1}}
            />
          )}
        />
      </WidgetSettingsSection>
      {options && (
        <BarChartSettingsMapping langIndex={langIndex} options={options} form={form} config={config} />
      )}
    </Box>
  )
}
