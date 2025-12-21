import {useI18n} from '@infoportal/client-i18n'
import {Core, Datatable} from '@/shared'
import {Page} from '@/shared/Page'
import {seq} from '@axanc/ts-utils'
import {Icon, useTheme} from '@mui/material'
import {useEffect, useMemo} from 'react'
import {useQueryKoboAccounts} from '@/core/query/useQueryKoboAccounts'
import {UseQueryForm} from '@/core/query/form/useQueryForm'
import {useLayoutContext} from '@/shared/Layout/LayoutContext'
import {createRoute, Link} from '@tanstack/react-router'
import {formRootRoute} from '@/features/Form/Form'
import {Api} from '@infoportal/api-sdk'
import {appConfig} from '@/conf/AppConfig.js'
import {DeploymentStatusIcon} from '@/shared/DeploymentStatus'
import {AssetIcon} from '@/shared/Asset.js'
import {UseQueryPermission} from '@/core/query/useQueryPermission.js'
import {UseQueryAssets} from '@/core/query/useQueryAssets'

export const formsRoute = createRoute({
  getParentRoute: () => formRootRoute,
  path: 'list',
  component: Forms,
})

const emptyColumnValue = {value: undefined, label: ''}

function Forms() {
  const {workspaceId} = formsRoute.useParams() as {workspaceId: Api.WorkspaceId}
  const {formatDate, m} = useI18n()
  const t = useTheme()
  const {setTitle} = useLayoutContext()
  const queryKoboAccount = useQueryKoboAccounts(workspaceId)
  const permissionWorkspace = UseQueryPermission.workspace({workspaceId})
  const assets = UseQueryAssets.getAll(workspaceId)

  const indexKoboAcc: Record<Api.Kobo.AccountId, Api.Kobo.Account> = useMemo(() => {
    return seq(queryKoboAccount.getAll.data).groupByFirst(_ => _.id)
  }, [queryKoboAccount.getAll.data])

  useEffect(() => {
    setTitle(m.selectADatabase)
    return () => setTitle('')
  }, [])

  return (
    <Page width="full">
      <Core.Panel>
        <Datatable.Component
          getRowKey={_ => _.id}
          // showExportBtn
          rowStyle={() => ({
            transition: t.transitions.create('background'),
            '&:hover': {background: t.vars.palette.action.hover},
          })}
          header={
            permissionWorkspace.data?.form_canCreate && (
              <Link to="/$workspaceId/new-form" params={{workspaceId}}>
                <Core.Btn icon="add" variant={'outlined'} sx={{mr: 0}}>
                  {m.add}
                </Core.Btn>
              </Link>
            )
          }
          id="kobo-index"
          data={assets.data}
          columns={[
            {
              id: 'type',
              type: 'select_one',
              width: 65,
              head: m.type,
              align: 'center',
              render: _ => {
                return {
                  label: <AssetIcon type={_.type as any} />,
                  value: _.type,
                  export: _.type,
                  option: _.type,
                }
              },
            },
            {
              id: 'status',
              type: 'select_one',
              width: 65,
              head: m.status,
              align: 'center',
              render: _ => {
                if (!_.form) return emptyColumnValue
                return {
                  label: <DeploymentStatusIcon status={_.form.deploymentStatus} />,
                  value: _.deploymentStatus,
                  export: _.deploymentStatus,
                  option: _.deploymentStatus,
                }
              },
            },
            {
              id: 'name',
              type: 'select_one',
              width: '2fr',
              head: m.name,
              render: _ => {
                return {
                  label: <Core.Txt bold>{_.name}</Core.Txt>,
                  value: _.name,
                }
              },
            },
            {
              id: 'category',
              type: 'select_one',
              head: m.assetTag,
              render: _ => {
                return {
                  label: _.category,
                  value: _.category,
                }
              },
            },
            {
              id: 'id',
              type: 'string',
              head: m.id,
              renderQuick: _ => _.id,
            },
            // {
            //   id: 'serverId',
            //   module: 'select_one',
            //   head: m.serverId,
            //   renderQuick: _ => _.kobo?.accountId,
            // },
            {
              id: 'linkedToKobo',
              type: 'select_one',
              width: 85,
              head: m.connectedToKobo,
              align: 'center',
              render: _ => {
                if (!_.form) return emptyColumnValue
                const isKobo = Api.Form.isKobo(_.form)
                const connected = Api.Form.isConnectedToKobo(_.form)
                if (!isKobo) return emptyColumnValue
                return {
                  label: connected ? (
                    <Icon color="success" sx={{transform: 'scale(0.9)'}} children="swap_vert" />
                  ) : (
                    <Icon color="error" children="mobiledata_off" />
                  ),
                  value: '' + connected,
                  export: '' + connected,
                  option: '' + connected,
                }
              },
            },
            {
              id: 'serverUrl',
              type: 'select_one',
              head: m.koboServer,
              render: _ => {
                if (!_.form) return emptyColumnValue
                const url = _.form.kobo?.accountId ? indexKoboAcc[_.form.kobo?.accountId]?.url : undefined
                if (url) {
                  return {
                    value: url,
                    label: (
                      <a className="link" href={url} target="_blank">
                        {url.replace(/https?:\/\//, '')}
                      </a>
                    ),
                  }
                }
                return {value: undefined, label: ''}
              },
            },
            // {
            //   id: 'program',
            //   module: 'select_one',
            //   head: m.program,
            //   renderQuick: _ => _.name,
            // },
            // {
            //   id: 'length',
            //   head: m.submissions,
            //   module: 'number',
            //   align: 'right',
            //   width: 0,
            //   renderQuick: _ => _.kobo.submissionsCount,
            // },
            {
              id: 'createdAt',
              type: 'date',
              head: m.createdAt,
              render: _ => {
                return {
                  label: <Core.Txt color="hint">{formatDate(_.createdAt)}</Core.Txt>,
                  value: _.createdAt,
                }
              },
            },
            {
              id: 'updatedAt',
              type: 'date',
              head: m.updatedAt,
              render: _ => {
                return {
                  label: _.updatedAt && <Core.Txt color="hint">{formatDate(_.updatedAt)}</Core.Txt>,
                  value: _.updatedAt,
                }
              },
            },
            {
              id: 'form_url',
              head: m.link,
              width: 60,
              align: 'center',
              type: 'string',
              render: _ => {
                return {
                  export: _.sharedLink,
                  tooltip: _.sharedLink,
                  value: _.sharedLink,
                  label: (
                    <a href={_.sharedLink} target="_blank" rel="noopener noreferrer">
                      <Core.IconBtn color="primary">{appConfig.icons.openFormLink}</Core.IconBtn>
                    </a>
                  ),
                }
              },
            },
            {
              id: 'actions',
              width: 45,
              styleHead: {maxWidth: 0},
              align: 'right',
              head: '',
              renderQuick: _ =>
                _.form ? (
                  <Link to="/$workspaceId/form/$formId" params={{workspaceId, formId: _.id}}>
                    <Core.IconBtn color="primary" children="chevron_right" />
                  </Link>
                ) : _.dashboard ? (
                  <Link to="/$workspaceId/dashboard/$dashboardId/edit" params={{workspaceId, dashboardId: _.id}}>
                    <Core.IconBtn color="primary" children="chevron_right" />
                  </Link>
                ) : undefined,
            },
          ]}
        />
      </Core.Panel>
    </Page>
  )
}
