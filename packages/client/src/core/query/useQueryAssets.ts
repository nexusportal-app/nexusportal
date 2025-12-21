import {UseQueryForm} from '@/core/query/form/useQueryForm'
import {UseQueryDashboard} from '@/core/query/dashboard/useQueryDashboard'
import {Api} from '@infoportal/api-sdk'
import {useMemo} from 'react'
import {Asset, AssetType} from '@/shared/Asset'
import {UseQueryWorkspace} from '@/core/query/workspace/useQueryWorkspace'
import {useRouter} from '@tanstack/react-router'
import {seq} from '@axanc/ts-utils'

export class UseQueryAssets {
  static readonly getAll = (workspaceId: Api.WorkspaceId) => {
    const queryForms = UseQueryForm.getAccessibles(workspaceId)
    const queryDashboards = UseQueryDashboard.getAll({workspaceId})
    const queryWorkspace = UseQueryWorkspace.getById(workspaceId)
    const router = useRouter()

    const data: Asset[] | undefined = useMemo(() => {
      if (!queryForms.data || !queryDashboards.data || !queryWorkspace.data) return
      const formsAsAssets: Asset[] = queryForms.data.map(_ => {
        return {
          id: _.id,
          name: _.name,
          type: _.type as AssetType,
          category: _.category,
          form: _,
          deploymentStatus: _.deploymentStatus,
          createdAt: _.createdAt,
          updatedAt: _.updatedAt,
          sharedLink: Api.Form.isConnectedToKobo(_)
            ? _.kobo.enketoUrl
            : router.buildLocation({
                to: '/collect/$workspaceId/$formId',
                params: {workspaceId, formId: _.id},
              }).href,
        }
      })
      const dashboardAsAssets: Asset[] = queryDashboards.data.map(_ => {
        const relative = Api.Dashboard.buildPath(queryWorkspace.data!, _)
        return {
          type: AssetType.dashboard,
          dashboard: _,
          id: _.id,
          name: _.name,
          category: _.category,
          deploymentStatus: undefined,
          createdAt: _.createdAt,
          sharedLink: relative,
        }
      })
      return seq([...formsAsAssets, ...dashboardAsAssets]).sortByNumber(_ => _.createdAt.getTime(), '9-0')
    }, [queryForms.data, queryDashboards.data])
    return {
      isLoading: queryForms.isLoading || queryDashboards.isLoading,
      error: queryForms.error || queryDashboards.error,
      data,
    }
  }
}
