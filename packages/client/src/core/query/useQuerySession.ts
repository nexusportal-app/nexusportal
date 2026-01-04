import {useAppSettings} from '@/core/context/ConfigContext'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {queryKeys} from '@/core/query/query.index'
import {Session} from '@/core/sdk/server/session/Session'
import {useIpToast} from '@/core/useToast'
import {Api} from '@infoportal/api-sdk'

export const useQuerySession = () => {
  const {api} = useAppSettings()
  const {toastHttpError} = useIpToast()
  const queryClient = useQueryClient()

  const getMe = useQuery({
    retry: 0,
    queryKey: queryKeys.session(),
    queryFn: async () => {
      try {
        return api.session.getMe()
      } catch (e) {
        // toastError(m.youDontHaveAccess)
        throw e
      }
    },
  })

  const connectAs = useMutation({
    mutationFn: async (email: Api.User.Email) => {
      const session = await api.session.connectAs(email)
      queryClient.setQueryData(queryKeys.session(), session)
      queryClient.invalidateQueries({queryKey: queryKeys.workspaces()})
      queryClient.invalidateQueries({queryKey: queryKeys.formAccess()})
    },
    onError: toastHttpError,
  })

  const revertConnectAs = useMutation({
    mutationFn: async () => {
      const session = await api.session.revertConnectAs()
      queryClient.setQueryData(queryKeys.session(), session)
      queryClient.invalidateQueries({queryKey: queryKeys.workspaces()})
      queryClient.invalidateQueries({queryKey: queryKeys.formAccess()})
    },
    onError: toastHttpError,
  })

  const logout = useMutation({
    mutationFn: async () => {
      await api.session.logout()
      queryClient.removeQueries({queryKey: queryKeys.session()})
      queryClient.removeQueries({queryKey: queryKeys.formAccess()})
    },
    onError: toastHttpError,
  })

  return {
    originalEmail: queryClient.getQueryData<string>(queryKeys.originalEmail()),
    getMe,
    connectAs,
    revertConnectAs,
    logout,
  }
}
