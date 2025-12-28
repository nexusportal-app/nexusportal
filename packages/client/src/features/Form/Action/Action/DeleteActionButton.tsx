import {Core} from '@/shared'
import {ReactElement} from 'react'
import {UseQueryFromAction} from '@/core/query/form/useQueryFromAction'
import {useNavigate} from '@tanstack/react-router'
import {useI18n} from '@infoportal/client-i18n'
import {Api} from '@infoportal/api-sdk'

export const DeleteActionButton = ({
  actionId,
  workspaceId,
  formId,
  children,
}: {
  actionId: Api.Form.ActionId
  workspaceId: Api.WorkspaceId
  formId: Api.FormId
  children: ReactElement
}) => {
  const queryRemove = UseQueryFromAction.remove(workspaceId, formId)
  const navigate = useNavigate()
  const {m} = useI18n()

  return (
    <Core.Modal
      loading={queryRemove.isPending}
      title={m.confirm}
      onConfirm={(e, close) =>
        queryRemove.mutateAsync({actionId}).then(() => {
          close()
          console.log('NAVIGATE')
          navigate({to: '/$workspaceId/form/$formId/action', params: {workspaceId, formId}})
        })
      }
    >
      {children}
    </Core.Modal>
  )
}
