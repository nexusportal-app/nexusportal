import {Core, Page} from '@/shared'
import {useI18n} from '@infoportal/client-i18n'
import {Box, Collapse, Icon} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDialogs} from '@toolpad/core'
import {KoboAccountFormDialog} from '@/features/NewForm/KoboAccountForm'
import {SelectKoboForm} from '@/features/NewForm/SelectKoboForm'
import {useQueryKoboAccounts} from '@/core/query/useQueryKoboAccounts'
import {Obj} from '@axanc/ts-utils'
import {NewFormCreateInternal} from '@/features/NewForm/NewFormCreateInternal'
import {useLayoutContext} from '@/shared/Layout/LayoutContext'
import {workspaceRoute} from '@/features/Workspace/Workspace'
import {createRoute, useNavigate} from '@tanstack/react-router'
import {Api} from '@infoportal/api-sdk'
import {UseQueryForm} from '@/core/query/form/useQueryForm'
import {Asset, assetStyle, AssetType} from '@/shared/Asset.js'
import {DashboardCreate} from '@/features/Dashboard/DashboardCreate'

export const newFormRoute = createRoute({
  getParentRoute: () => workspaceRoute,
  path: 'new-form',
  component: NewForm,
})

const OptionBody = ({icon, color, label}: {color: string; icon: string; label: string}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Icon sx={{fontSize: 50, color}}>{icon}</Icon>
      {label}
    </Box>
  )
}

function NewForm() {
  const {m} = useI18n()
  const {workspaceId} = newFormRoute.useParams() as {workspaceId: Api.WorkspaceId}
  const {setTitle} = useLayoutContext()
  const dialog = useDialogs()
  const navigate = useNavigate()

  const [type, setType] = useState<AssetType>()
  const [selectedServerId, setSelectedServerId] = useState<Api.Kobo.AccountId>()

  const queryForm = UseQueryForm.create(workspaceId)
  const queryServer = useQueryKoboAccounts(workspaceId)

  const handleOpen = () => {
    dialog.open(KoboAccountFormDialog, {workspaceId})
  }
  useEffect(() => {
    setTitle(m.newForm)
    return () => setTitle('')
  }, [])

  return (
    <Page width="xs" sx={{minHeight: undefined}}>
      <Core.Panel>
        <Core.PanelHead icon="add">{m.new}</Core.PanelHead>
        <Core.PanelBody>
          <Core.RadioGroup value={type} sx={{flex: 1}} onChange={setType}>
            {Obj.keys(AssetType).map(asset => (
              <Core.RadioGroupItem
                key={asset}
                hideRadio
                value={asset}
                before={
                  <Icon fontSize="large" sx={{alignSelf: 'center', mr: 2, color: assetStyle.color[asset]}}>
                    {assetStyle.icon[asset]}
                  </Icon>
                }
                title={m.assetsName_[asset]}
                description={m.formSourceCreate_[asset]}
                sx={{flex: 1}}
              />
            ))}
          </Core.RadioGroup>
        </Core.PanelBody>
      </Core.Panel>
      {type &&
        (() => {
          switch (type) {
            case 'internal':
            case 'smart': {
              return (
                <NewFormCreateInternal
                  workspaceId={workspaceId}
                  loading={queryForm.isPending}
                  btnLabel={m.create + ' ' + m.assetsName_[type].toLowerCase()}
                  onSubmit={async form => {
                    const newForm = await queryForm.mutateAsync({...form, type})
                    navigate({to: '/$workspaceId/form/$formId', params: {workspaceId, formId: newForm.id}})
                  }}
                />
              )
            }
            case 'kobo': {
              return (
                <>
                  <Core.Panel>
                    <Core.PanelHead>{m.selectAccount}</Core.PanelHead>
                    <Core.PanelBody>
                      <Core.RadioGroup sx={{flex: 1, minWidth: 200}} dense onChange={setSelectedServerId}>
                        {queryServer.getAll.data?.map(_ => (
                          <Core.RadioGroupItem
                            key={_.id}
                            value={_.id}
                            title={_.name}
                            description={_.url}
                            // endContent={
                            //   <Core.IconBtn
                            //     size="small"
                            //     loading={queryServer.remove.isPending}
                            //     onClick={e => {
                            //       e.stopPropagation()
                            //       handleDelete(_.id)
                            //     }}
                            //   >
                            //     delete
                            //   </Core.IconBtn>
                            // }
                          />
                        ))}
                        <Core.RadioGroupItem value={null} title={m.addNewKoboAccount} onClick={handleOpen} icon="add" />
                      </Core.RadioGroup>
                    </Core.PanelBody>
                  </Core.Panel>
                  <Collapse in={!!selectedServerId} mountOnEnter unmountOnExit>
                    <SelectKoboForm
                      workspaceId={workspaceId}
                      accountId={selectedServerId!}
                      onAdded={() => queryServer.getAll.refetch()}
                    />
                  </Collapse>
                </>
              )
            }
            case 'dashboard': {
              return (
                <DashboardCreate
                  workspaceId={workspaceId}
                  onSubmitted={_ =>
                    navigate({
                      to: '/$workspaceId/dashboard/$dashboardId/edit/settings',
                      params: {workspaceId, dashboardId: _.id},
                    })
                  }
                />
              )
            }
          }
        })()}
    </Page>
  )
}
