import {Icon as MuiIcon, IconProps} from '@mui/material'
import {Api} from '@infoportal/api-sdk'
import {useI18n} from '@infoportal/client-i18n'
import {appConfig} from '@/conf/AppConfig'

export type Asset = {
  id: string
  name: string
  category?: string
  createdAt: Date
  updatedAt?: Date
  deploymentStatus?: Api.Form.DeploymentStatus
  type: AssetType
  form?: Api.Form
  sharedLink?: string
  dashboard?: Api.Dashboard
}

export enum AssetType {
  internal = 'internal',
  smart = 'smart',
  kobo = 'kobo',
  dashboard = 'dashboard',
}

export const assetStyle = {
  icon: {
    [AssetType.internal]: 'content_paste',
    [AssetType.kobo]: 'cloud_download',
    [AssetType.smart]: 'dynamic_form',
    [AssetType.dashboard]: appConfig.icons.dashboard,
  },
  color: {
    [AssetType.internal]: '#14b8a6',
    [AssetType.kobo]: '#2196F3',
    [AssetType.smart]: '#9C27B0',
    [AssetType.dashboard]: '#FF9800',
  },
}

export const AssetIcon = ({type, sx, ...props}: IconProps & {type: AssetType}) => {
  const {m} = useI18n()
  return (
    <MuiIcon title={m.assetsName_[type]} sx={{color: assetStyle.color[type], ...sx}} {...props}>
      {assetStyle.icon[type]}
    </MuiIcon>
  )
}
