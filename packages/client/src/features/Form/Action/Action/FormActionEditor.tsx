import {Box, BoxProps, Icon, Tab, Tabs, useTheme} from '@mui/material'
import {useI18n} from '@infoportal/client-i18n'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Obj} from '@axanc/ts-utils'
import Editor, {useMonaco} from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
// @ts-ignore
import {constrainedEditor} from 'constrained-editor-plugin'
import {Core} from '@/shared'
import {UseQueryFromAction} from '@/core/query/form/useQueryFromAction'
import {Api} from '@infoportal/api-sdk'
import {DeleteActionButton} from '@/features/Form/Action/Action/DeleteActionButton'
import {useCaptureCtrlS} from '@/shared/useCaptureCtrlS'

const monacoBg = '#1e1e1e'

type Props = BoxProps & {
  actionId: Api.Form.ActionId
  workspaceId: Api.WorkspaceId
  formId: Api.FormId
  body?: string
  inputType: string
  outputType: string
  isReadOnly?: boolean
}

const ACTION_PATH = '/action.ts'

export function FormActionEditor(props: Props) {
  const monaco = useMonaco()
  if (!monaco) return null
  return <FormActionEditorWithMonaco monaco={monaco} {...props} />
}

function FormActionEditorWithMonaco({
  workspaceId,
  formId,
  actionId,
  body = getDefaultBody(),
  inputType,
  outputType,
  isReadOnly,
  monaco,
  sx,
  ...boxProps
}: Props & {monaco: NonNullable<ReturnType<typeof useMonaco>>}) {
  const t = useTheme()
  const {m} = useI18n()
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const constrainedRef = useRef<any>(null)

  const queryActionUpdate = UseQueryFromAction.update(workspaceId, formId)

  const files = useMemo(
    () => ({
      [ACTION_PATH]: {value: body, readonly: false},
      '/input.ts': {value: inputType, readonly: true},
      '/output.ts': {value: outputType, readonly: true},
      '/meta.ts': {value: getMetaInterface(), readonly: true},
    }),
    [body, inputType, outputType],
  )

  const [activePath, setActivePath] = useState<keyof typeof files>(ACTION_PATH)
  const [bodyChanges, setBodyChanges] = useState(body)

  const getModel = useCallback(
    (path: string) => monaco.editor.getModel(monaco.Uri.file(path)),
    [monaco],
  )

  const ensureModels = useCallback(() => {
    Obj.entries(files).forEach(([path, {value}]) => {
      const uri = monaco.Uri.file(path)
      if (!monaco.editor.getModel(uri)) {
        monaco.editor.createModel(value, 'typescript', uri)
      }
    })

    // extra libs only for readonly type sources
    // ;['/input.ts', '/output.ts', '/meta.ts'].forEach(path => {
    //   monaco.typescript.typescriptDefaults.addExtraLib(
    //     files[path as keyof typeof files].value,
    //     `file://${path}`,
    //   )
    // })
  }, [files, monaco])

  useEffect(() => {
    Obj.entries(files).forEach(([path, {value}]) => {
      const model = monaco.editor.getModel(monaco.Uri.file(path))
      if (model && model.getValue() !== value) {
        model.setValue(value)
      }
    })

    setBodyChanges(body)
  }, [actionId, files, monaco])

  const handleMount = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor) => {
      editorRef.current = editor
      ensureModels()

      editor.setModel(getModel(activePath)!)
      constrainedRef.current = constrainedEditor(monaco)
      constrainedRef.current.initializeIn(editor)
    },
    [ensureModels, getModel, activePath, monaco],
  )

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    const model = getModel(activePath)
    if (!model) return

    editor.setModel(model)

    const readonly = isReadOnly || files[activePath].readonly
    editor.updateOptions({readOnly: readonly})

    // Apply constraints only on action.ts
    if (activePath === ACTION_PATH && constrainedRef.current) {
      constrainedRef.current.removeAllRestrictions?.(model)

      constrainedRef.current.addRestrictionsTo(model, [
        {
          range: [
            6,
            1,
            model.getLineCount(),
            model.getLineMaxColumn(model.getLineCount()),
          ],
        },
      ])
    }
  }, [activePath, isReadOnly, files, getModel])

  const handleSave = useCallback(async () => {
    if (isReadOnly) return

    const model = getModel(ACTION_PATH)
    if (!model) return

    const markers = monaco.editor.getModelMarkers({resource: model.uri})
    const errors = markers.filter(m => m.severity === monaco.MarkerSeverity.Error).length
    const warnings = markers.filter(m => m.severity === monaco.MarkerSeverity.Warning).length

    await queryActionUpdate.mutateAsync({
      id: actionId,
      body: bodyChanges,
      bodyErrors: errors,
      bodyWarnings: warnings,
    })
  }, [isReadOnly, getModel, monaco, bodyChanges, queryActionUpdate, actionId])

  useCaptureCtrlS(handleSave)
  useEffect(() => setBodyChanges(body), [body])

  return (
    <Box
      sx={{
        height: '100%',
        maxHeight: '85vh',
        minHeight: 0,
        borderRadius: t.vars.shape.borderRadius,
        background: monacoBg,
        ...sx,
      }}
      {...boxProps}
    >
      <Tabs value={activePath} onChange={(_, v) => setActivePath(v)} sx={{background: 'none', mb: 0.5}}>
        {Obj.keys(files).map(path => (
          <Tab
            key={path}
            value={path}
            sx={{color: 'white'}}
            label={
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                {(isReadOnly || files[path].readonly) && (
                  <Icon fontSize="small" sx={{mr: 1}}>
                    lock
                  </Icon>
                )}
                {path.replace('/', '')}
              </Box>
            }
          />
        ))}

        {!isReadOnly && (
          <>
            <Core.Btn
              size="small"
              variant="contained"
              loading={queryActionUpdate.isPending}
              disabled={bodyChanges === body}
              onClick={handleSave}
              sx={{alignSelf: 'center', ml: 'auto', mr: 1}}
            >
              {m.save}
            </Core.Btn>

            <DeleteActionButton actionId={actionId} formId={formId} workspaceId={workspaceId}>
              <Core.IconBtn sx={{color: 'white'}}>delete</Core.IconBtn>
            </DeleteActionButton>
          </>
        )}
      </Tabs>

      <Editor
        theme="vs-dark"
        defaultLanguage="typescript"
        options={{minimap: {enabled: false}}}
        beforeMount={m => {
          m.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: m.languages.typescript.ScriptTarget.ES2020,
            strict: true,
            noEmit: true,
            allowNonTsExtensions: true,
          })
        }}
        onMount={handleMount}
        onChange={value => {
          if (activePath === ACTION_PATH && typeof value === 'string') {
            setBodyChanges(value)
          }
        }}
      />
    </Box>
  )
}

function getMetaInterface() {
  return [
    `// Meta data`,
    `export type Submission<T extends Record<string, any>> = {`,
    `  id: string`,
    `  submissionTime: Date`,
    `  submittedBy: string`,
    `  answers: T`,
    `  start?: Date`,
    `  end?: Date`,
    `  version: string`,
    `  formId: string`,
    `  validationStatus: 'Approved' | 'Pending' | 'Rejected' | 'Flagged' | 'UnderReview'`,
    `  attachments: {`,
    `    download_url: string`,
    `    filename: string`,
    `    download_small_url: string`,
    `    question_xpath: string`,
    `    id: number`,
    `  }[]`,
    `}`,
  ].join('\n')
}

function getDefaultBody() {
  return [
    `import {Input} from 'input'`,
    `import {Output} from 'output'`,
    `import {Submission} from 'meta'`,
    ``,
    `export async function transform(`,
    `  submission: Submission<Input.Type>`,
    `): Promise<Output.Type | Output.Type[]> {`,
    `  return submission`,
    `}`,
  ].join('\n')
}
