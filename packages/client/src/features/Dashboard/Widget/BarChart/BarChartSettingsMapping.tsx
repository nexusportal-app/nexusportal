import {WidgetSettingsSection} from '@/features/Dashboard/Widget/shared/WidgetSettingsSection'
import {ChoiceMapper, ChoicesMapperPanel} from '@/features/Dashboard/Widget/shared/ChoicesMapper'
import {useController, UseFormReturn, useWatch} from 'react-hook-form'
import {Checkbox, InputBase} from '@mui/material'
import React, {memo, useRef} from 'react'
import {useI18n} from '@infoportal/client-i18n'
import {Core} from '@/shared'
import {Api} from '@infoportal/api-sdk'
import {useVirtualizer} from '@tanstack/react-virtual'

const ROW_HEIGHT = 36

export const BarChartSettingsMapping = memo(({
  langIndex,
  config,
  form,
  options,
}: {
  options: Api.Form.Choice[]
  form: UseFormReturn<Api.Dashboard.Widget.Config['BarChart']>
  langIndex: number,
  config: Api.Dashboard.Widget.Config['BarChart']
}) => {
  const {m} = useI18n()
  const parentRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  })

  const {field: hiddenChoicesField} = useController({
    control: form.control,
    name: 'hiddenChoices',
  })
  const hiddenChoices = hiddenChoicesField.value ?? []

  const toggle = (name: string, checked: boolean) => {
    hiddenChoicesField.onChange(
      checked
        ? [...hiddenChoices, name]
        : hiddenChoices.filter(v => v !== name),
    )
  }

  const mapping = useWatch({
    control: form.control,
    name: 'mapping',
  })

  return (
    <WidgetSettingsSection title={m.mapping}>
      <ChoicesMapperPanel
        ref={parentRef}
        sx={{
          height: ROW_HEIGHT * 25,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const choice = options[virtualRow.index]
            return (
              <ChoiceMapper
                label={choice.label?.[langIndex]}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                key={virtualRow.key}
                question={config.questionName!}
                choiceName={choice.name}
                before={
                  <Checkbox
                    size="small"
                    checked={!hiddenChoices.includes(choice.name)}
                    onChange={e => toggle(choice.name, !e.target.checked)}
                  />
                }
              >
                <InputBase
                  defaultValue={mapping?.[choice.name]?.[langIndex] ?? ''}
                  onChange={e => {
                    form.setValue(
                      `mapping.${choice.name}.${langIndex}`,
                      e.target.value,
                      {shouldDirty: true, shouldTouch: false, shouldValidate: false},
                    )
                  }}
                  endAdornment={
                    <Core.IconBtn children="clear" size="small" onClick={() =>
                      form.setValue(
                        `mapping.${choice.name}.${langIndex}`,
                        null as any,
                        {shouldDirty: true},
                      )
                    } />
                  }
                />
              </ChoiceMapper>
            )
          })}
        </div>
      </ChoicesMapperPanel>
    </WidgetSettingsSection>

  )
})