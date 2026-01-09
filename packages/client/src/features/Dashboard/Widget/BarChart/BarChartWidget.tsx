import {Answers, useDashboardContext} from '@/features/Dashboard/Context/DashboardContext'
import {WidgetCardPlaceholder} from '@/features/Dashboard/Widget/shared/WidgetCardPlaceholder'
import {WidgetTitle} from '@/features/Dashboard/Widget/shared/WidgetTitle'
import {Core, Datatable} from '@/shared'
import {Box} from '@mui/material'
import {Api} from '@infoportal/api-sdk'
import {useCallback, useMemo} from 'react'
import {encodeStringName} from '@/features/Dashboard/Widget/BarChart/BarChartSettings'
import {seq} from '@axanc/ts-utils'

export function BarChartWidget({widget, inEditor}: {inEditor?: boolean; widget: Api.Dashboard.Widget}) {
  const config = widget.config as Api.Dashboard.Widget.Config['BarChart']

  const byPeriod = useDashboardContext(_ => _.data.filterFns.byPeriodCurrentDelta)
  const getFilteredData = useDashboardContext(_ => _.data.getFilteredData)
  const filterFns = useDashboardContext(_ => _.data.filterFns)
  const langIndex = useDashboardContext(_ => _.langIndex)
  const flattenRepeatGroupData = useDashboardContext(_ => _.flattenRepeatGroupData)
  const filter = useDashboardContext(_ => _.filter.get)
  const updateQuestion = useDashboardContext(_ => _.filter.updateQuestion)
  const schemaInspector = useDashboardContext(_ => _.schemaInspector)

  const question = useMemo(() => {
    return schemaInspector.lookup.questionIndex[config.questionName!]
  }, [schemaInspector, config.questionName])

  const filteredData = useMemo(() => {
    const d = getFilteredData([
      filterFns.byPeriodCurrent,
      filterFns.byDashboardFilter({excludedQuestion: config.questionName}),
      filterFns.byWidgetFilter(config.filter),
    ])
    return flattenRepeatGroupData.flattenIfRepeatGroup(d, config.questionName)
  }, [
    getFilteredData,
    config.questionName,
    config.filter,
    filterFns.byDashboardFilter,
    filterFns.byPeriodCurrent,
    filterFns.byWidgetFilter,
    flattenRepeatGroupData,
  ])

  const labels: Record<string, string> = useMemo(() => {
    const qName = config.questionName
    if (!qName || !question) return {}
    if (question.type === 'text') {
      return seq([Datatable.Utils.blank, ...filteredData.map(_ => _[qName])]).reduceObject(value => [encodeStringName(value), value])
    }
    const choices = schemaInspector.lookup.getOptionsByQuestionName(qName)
    if (!choices) return {}
    return choices.reduceObject<Record<string, string>>(_ => [_.name, schemaInspector.translate.choice(qName, _.name)])
  }, [filteredData, config.questionName, schemaInspector])

  const by = useMemo(() => {
    if (!question) return
    const getTranslated = (v: string) => {
      return config.mapping?.[v]?.[langIndex] ?? v ?? ''
    }
    switch (question.type) {
      case 'text':
        return (a: Answers) => {
          const encoded = encodeStringName(a[question.name])
          return config.mapping?.[encoded]?.[langIndex] ?? encoded
        }
      case 'select_multiple':
        return (a: Answers) => {
          const value = a[question.name]
          const safeValue = value && !Array.isArray(value) ? [value] : value
          return (safeValue as string[])?.map(getTranslated)
        }
      case 'select_one':
        return (a: Answers) => {
          return getTranslated(a[question.name])
        }
      default:
        return undefined
    }
  }, [config.mapping, langIndex, question])

  const hiddenChoices = useMemo(() => {
    return config.hiddenChoices?.map(_ => (config.mapping ?? {})[_]?.[langIndex] ?? _)
  }, [config.hiddenChoices, langIndex, config.mapping])

  const handleChoiceClick = useCallback(
    (key: string) => {
      if (config.mapping) {
        const values = Object.entries(config.mapping)
          .filter(([choiceName, mappedValues]) => mappedValues?.[langIndex] === key)
          .map(_ => _[0])
        updateQuestion(config.questionName!, values.length === 0 ? [key] : values)
      } else {
        updateQuestion(config.questionName!, [key])
      }
    },
    [config.questionName!, langIndex, updateQuestion, config.mapping],
  )

  if (!config.questionName || !question) return <WidgetCardPlaceholder type={widget.type} />

  return (
    <Box sx={{p: 1}}>
      <WidgetTitle>{widget.i18n_title?.[langIndex]}</WidgetTitle>
      <Core.ChartBarBy
        checked={filter.questions[config.questionName]}
        onClickData={inEditor ? undefined : handleChoiceClick}
        compareBy={config.showEvolution ? byPeriod : undefined}
        minValue={config.minValue}
        multiple={question.type === 'select_multiple'}
        hideValue={!config.showValue}
        data={filteredData}
        labels={labels}
        limit={config.limit}
        skippedKeys={hiddenChoices}
        by={by ?? ((a: Answers) => a[question.name])}
      />
    </Box>
  )
}
