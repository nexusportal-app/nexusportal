import {Box, SxProps, Tab, Tabs, useTheme} from '@mui/material'
import * as Datatable from '@infoportal/client-datatable'
import {useI18n} from '@infoportal/client-i18n'
import {getDataKey} from '../core/useStore'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import * as Core from '@infoportal/client-core'
import {Api} from '@infoportal/api-sdk'
import {ActionBar} from './ActionBar'
import {getChoicesColumns} from './getChoicesColumns'
import {getSurveyColumns} from './getSurveyColumns'
import {SchemaValidator} from '@infoportal/form-helper'
import {ErrorModal, ErrorModalValue} from './ErrorModal'
import {TranslationsManager} from './TranslationsManager'
import {useXlsFormState, XlsFormEditorProvider} from './XlsFormEditorContext'
import {useCaptureCtrlS} from '@infoportal/client/src/shared/useCaptureCtrlS'
import {hasSchemaChanged} from './hasSchemaChanged'
import {alphaVar} from '@infoportal/client-core'

export type XlsFormEditorProps = {
  saving?: boolean
  value?: Api.Form.Schema
  onChange?: (_: Api.Form.Schema) => void
  onCommit?: (_: Api.Form.Schema) => void
  onSave?: (_: Api.Form.Schema) => void
}

export type TableName = 'survey' | 'choices'

const tableSx: SxProps = {
  height: 'calc(100vh - 182px)',
  '& .dtd': {px: 0},
}

export const XlsFormEditor = (props: XlsFormEditorProps) => {
  return (
    <XlsFormEditorProvider value={props.value}>
      <XlsFormEditorWithStore {...props} />
    </XlsFormEditorProvider>
  )
}

export const XlsFormEditorWithStore = ({value, saving, onChange, onCommit}: XlsFormEditorProps) => {
  const {m} = useI18n()
  const t = useTheme()

  const schema = useXlsFormState(_ => _.schema)
  const addSurveyRow = useXlsFormState(_ => _.addRows)
  const reorderRows = useXlsFormState(_ => _.reorderRows)
  const deleteRows = useXlsFormState(_ => _.deleteRows)
  const undo = useXlsFormState(_ => _.undo)
  const redo = useXlsFormState(_ => _.redo)
  const past = useXlsFormState(_ => _.past)
  const future = useXlsFormState(_ => _.future)

  const [lastSelectedRowKey, setLastSelectedRowKey] = useState<string | undefined>(undefined)
  const [rowsToAdd, setRowsToAdd] = useState(1)
  const [validationReport, setValidationReport] = useState<ErrorModalValue | undefined>()
  const [activeTab, setActiveTab] = useState<TableName>('survey')
  const datatableHandle = useRef<Datatable.Handle>(null)

  const hasChanged = useMemo(() => {
    return hasSchemaChanged(value, schema)
  }, [value, schema])

  const columns: Datatable.Column.Props<any>[] = useMemo(() => {
    const defaultWith = 160
    const cols =
      activeTab === 'survey'
        ? getSurveyColumns({t, translations: schema.translations})
        : getChoicesColumns({t, translations: schema.translations})
    return cols.map(_ => {
      if (_.width) return _
      return {
        ..._,
        width: defaultWith,
      }
    })
  }, [activeTab, schema.translations])

  const checkFormAndSubmit = useCallback(
    (cb?: (_: Api.Form.Schema) => void) => {
      if (!cb || !hasChanged) return
      // if (JSON.stringify(value) === JSON.stringify(schema)) {
      //   setValidationReport({noChanges: true})
      //   return
      // }
      const errors = SchemaValidator.validate(schema)
      if (errors?.errors) setValidationReport(errors)
      else cb?.(schema)
    },
    [hasChanged, schema],
  )

  useEffect(() => {
    checkFormAndSubmit(onChange)
  }, [schema, checkFormAndSubmit])

  // useBeforeUnload(hasChanged)
  useCaptureCtrlS(() => {
    checkFormAndSubmit(onCommit)
  })

  const handleEvent = useCallback((action: Datatable.Action<Api.Form.Question | Api.Form.Choice>) => {
    switch (action.type) {
      case 'CELL_SELECTION_SET_ROW_IDS': {
        setLastSelectedRowKey(action.rowIds ? (action.rowIds[action.rowIds.length - 1] as string) : undefined)
        break
      }
      case 'CELL_SELECTION_CLEAR': {
        setLastSelectedRowKey(undefined)
        break
      }
      case 'REORDER_ROWS': {
        reorderRows({table: activeTab, ...action})
        break
      }
    }
  }, [])

  const header = useCallback(() => {
    return (
      <Box sx={{display: 'flex', width: '100%', alignItems: 'center'}}>
        <Tabs value={activeTab} onChange={(e, v: TableName) => setActiveTab(v)}>
          <Tab label="survey" value="survey" />
          <Tab label="choices" value="choices" />
        </Tabs>
        <TranslationsManager />
        <Core.IconBtn children="undo" disabled={!past.length} onClick={undo} sx={{marginLeft: 'auto'}} />
        <Core.IconBtn children="redo" disabled={!future.length} onClick={redo} />
        <Core.Btn
          loading={saving}
          disabled={!hasChanged}
          variant="contained"
          onClick={() => {
            checkFormAndSubmit(onCommit)
          }}
        >
          {m.save}
        </Core.Btn>
      </Box>
    )
  }, [onCommit, schema, activeTab])

  return (
    <Core.Panel sx={{width: '100%', mb: 0, overflowX: 'auto'}}>
      <Datatable.Component
        ref={datatableHandle}
        header={header}
        rowStyle={_ => {
          return (_ as Api.Form.Question).type === 'begin_group'
            ? {background: t.vars?.palette.action.disabledBackground}
            : (_ as Api.Form.Question).type === 'begin_repeat'
              ? {background: alphaVar(t.vars?.palette.info.main, 0.3)}
              : null
        }}
        module={{
          export: {enabled: true},
          rowsDragging: {enabled: true},
          cellSelection: {
            mode: 'free',
            enabled: true,
            renderFormulaBarOnColumnSelected: ({columnId, rowIds, commonValue}) => {
              const [field, lang] = columnId.split(':') as [keyof Api.Form.Question, string | undefined]
              return <ActionBar rowKeys={rowIds} table="survey" value={commonValue} field={field} lang={lang} />
            },
            renderFormulaBarOnRowSelected: ({rowIds}) => (
              <Core.Btn
                icon="delete"
                size="small"
                variant="outlined"
                color="error"
                onClick={() => deleteRows({table: activeTab, rowIds})}
              >
                {m.delete}
              </Core.Btn>
            ),
          },
          columnsResize: {enabled: true},
          columnsToggle: {enabled: true},
        }}
        rowHeight={34}
        showRowIndex
        onEvent={handleEvent}
        sx={tableSx}
        id={'xls-form-editor-' + activeTab}
        columns={columns}
        // getRowChangeTracker={getDataKey}
        getRowKey={getDataKey}
        data={schema[activeTab]}
      />
      <Box sx={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', my: 0.5}}>
        <Core.Btn
          onClick={() => {
            addSurveyRow({table: activeTab, count: rowsToAdd, atRowKey: lastSelectedRowKey})
            if (lastSelectedRowKey) return
            setTimeout(() => datatableHandle.current?.scrollBottom())
          }}
          icon="add"
        >
          {m.add}
        </Core.Btn>
        <Core.Input
          sx={{width: 80, mr: 1}}
          type="number"
          helperText={null}
          value={rowsToAdd}
          size="tiny"
          onChange={e => {
            setRowsToAdd(+e.target.value)
          }}
        />
        {m._xlsFormEditor.moreRows}
      </Box>
      <ErrorModal report={validationReport} onClose={() => setValidationReport(undefined)} />
    </Core.Panel>
  )
}
