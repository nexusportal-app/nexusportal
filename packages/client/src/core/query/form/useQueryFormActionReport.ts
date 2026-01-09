import {useAppSettings} from '@/core/context/ConfigContext.js'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {HttpError, Api} from '@infoportal/api-sdk'
import {queryKeys} from '@/core/query/query.index.js'

export class UseQueryFormActionReport {
  static getRunning({formId, workspaceId}: {workspaceId: Api.WorkspaceId; formId: Api.FormId}) {
    const queryClient = useQueryClient()
    const {apiv2} = useAppSettings()
    const queryKey = queryKeys.formActionReport(workspaceId, formId, 'live')
    return useQuery({
      queryKey,
      queryFn: async () =>
        apiv2.form.action.report
          .getRunning({workspaceId, formId})
          .then(result => {
            if (!result) throw new HttpError.NotFound()
            return result
          })
          .catch(e => {
            if (e instanceof HttpError.NotFound) queryClient.removeQueries({queryKey})
            throw e
          }),
      staleTime: 0,
      retry: Infinity,
      retryDelay: 1000,
      refetchInterval: 2000,
    })
  }

  static getByFormId({formId, workspaceId}: {workspaceId: Api.WorkspaceId; formId: Api.FormId}) {
    const {apiv2} = useAppSettings()
    const queryKey = queryKeys.formActionReport(workspaceId, formId)
    return useQuery({
      queryKey,
      queryFn: async () => apiv2.form.action.report.getByFormId({workspaceId, formId}),
    })
  }
}
