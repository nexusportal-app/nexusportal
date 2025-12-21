import {useI18n} from '@infoportal/client-i18n'
import {Box, CircularProgress} from '@mui/material'
import React, {RefObject, useEffect, useRef, useState} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Controller, useForm, UseFormReturn} from 'react-hook-form'
import {useIpToast} from '@/core/useToast'
import {UseQueryDashboard} from '@/core/query/dashboard/useQueryDashboard'
import {useFetcher} from '@axanc/react-hooks'
import {Core} from '@/shared'
import {Api} from '@infoportal/api-sdk'
import {UseQueryWorkspace} from '@/core/query/workspace/useQueryWorkspace'
import {SwitchBox} from '@/shared/customInput/SwitchBox'
import {SelectFormInput} from '@/shared/customInput/SelectFormInput'
import {SelectFormCategory} from '@/shared/customInput/SelectFormCategory'

type Form = {
  slug: string
  name: string
  category?: string
  sourceFormId: Api.FormId
  isPublic: boolean
}

type Context = {
  form: UseFormReturn<Form>
  stepperRef: RefObject<Core.StepperHandle | null>
  onClose?: () => void
  workspaceId: Api.WorkspaceId
}

const Context = React.createContext<Context>({} as Context)
const useContext = () => React.useContext(Context)

export const DashboardCreate = ({
  workspaceId,
  onSubmitted,
  onClose,
}: {
  workspaceId: Api.WorkspaceId
  onSubmitted?: (_: Api.Dashboard) => void
  onClose?: () => void
}) => {
  const {toastHttpError} = useIpToast()
  const {m} = useI18n()

  const queryDashboardCreate = UseQueryDashboard.create({workspaceId})

  const stepperRef = useRef<Core.StepperHandle>(null)
  const form = useForm<Form>({
    mode: 'onChange',
  })

  const submit = async (values: Form) => {
    try {
      const newDashboard = await queryDashboardCreate.mutateAsync(values)
      form.reset()
      onClose?.()
      onSubmitted?.(newDashboard)
    } catch (e) {
      toastHttpError(e)
    }
  }

  return (
    <Context.Provider
      value={{
        onClose,
        form,
        stepperRef,
        workspaceId,
      }}
    >
      <form onSubmit={form.handleSubmit(submit)}>
        <Core.Panel>
          <Core.PanelHead>{m.details}</Core.PanelHead>
          <Core.PanelBody>
            <SelectInfoInfo />
            <Core.PanelTitle sx={{mt: 4, mb: 2}}>{m.dataSource}</Core.PanelTitle>
            <SelectSource />
          </Core.PanelBody>
          <Core.PanelFoot>
            <Core.Btn disabled={!form.formState.isValid} variant="contained" type="submit">
              {m.create}
            </Core.Btn>
          </Core.PanelFoot>
        </Core.Panel>
      </form>
    </Context.Provider>
  )
}

function SelectInfoInfo() {
  const {apiv2} = useAppSettings()
  const {m} = useI18n()
  const {form, workspaceId} = useContext()
  const {conf} = useAppSettings()
  const queryWorkspace = UseQueryWorkspace.getById(workspaceId)
  const watch = {
    name: form.watch('name'),
    slug: form.watch('slug'),
  }
  const [disableSlug, setDisableSlug] = useState(true)

  const fetchCheckSlug = useFetcher(apiv2.dashboard.checkSlug)

  useEffect(() => {
    if (disableSlug || watch.slug === '') return
    fetchCheckSlug.fetch({force: true, clean: true}, {workspaceId, slug: watch.slug}).then(res => {
      if (res.isFree) form.clearErrors('slug')
      else
        form.setError('slug', {
          type: 'validate',
          message: 'Already exists!',
        })
    })
  }, [watch.slug])

  useEffect(() => {
    if (watch.name === '') {
      form.setValue('slug', '', {shouldValidate: true, shouldTouch: true, shouldDirty: true})
      return
    }
    const handler = setTimeout(() => {
      fetchCheckSlug.fetch({force: true, clean: false}, {workspaceId, slug: watch.name}).then(res => {
        form.setValue('slug', res.suggestedSlug, {shouldValidate: true, shouldTouch: true, shouldDirty: true})
      })
    }, 400)

    return () => {
      clearTimeout(handler)
    }
  }, [watch.name])

  return (
    <>
      <Controller
        control={form.control}
        rules={{
          required: true,
        }}
        name="name"
        render={({field}) => <Core.Input required label={m.name} {...field} />}
      />
      <Controller
        control={form.control}
        name="slug"
        rules={{
          required: true,
        }}
        render={({field, fieldState}) => (
          <Core.Input
            notched={!!watch.name}
            InputLabelProps={{shrink: !!watch.name}}
            label={m.dashboardId}
            disabled={disableSlug}
            size="small"
            required
            error={!!fieldState.error?.message}
            helperText={fieldState.error?.message}
            endAdornment={
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress sx={{visibility: fetchCheckSlug.loading ? 'visible' : 'hidden'}} size={24} />
                <Core.IconBtn onClick={() => setDisableSlug(_ => !_)}>edit</Core.IconBtn>
              </Box>
            }
            {...field}
          />
        )}
      />
      {queryWorkspace.data && watch.slug && (
        <Core.Input
          disabled
          // slotProps={{notchedOutline: {sx: {border: 'none', borderRadius: '0', borderBottom: '1px dashed t.'}}}}
          label={m.dashboardLink}
          value={new URL(Api.Dashboard.buildPath(queryWorkspace.data, watch), conf.baseURL).toString()}
        />
      )}
      <Controller
        name="category"
        control={form.control}
        render={({field}) => (
          <SelectFormCategory
            {...field}
            workspaceId={workspaceId}
            value={field.value}
            onChange={(e, value) => field.onChange(value)}
            onInputChange={(_, value) => field.onChange(value)}
          />
        )}
      />
      <SwitchBox {...form.register('isPublic')} size="small" label={m.public} icon="public" />
    </>
  )
}

function SelectSource() {
  const {workspaceId, form} = useContext()
  return (
    <>
      <Controller
        name="sourceFormId"
        control={form.control}
        rules={{
          required: true,
        }}
        render={({field}) => <SelectFormInput {...field} workspaceId={workspaceId} />}
      />
    </>
  )
}
