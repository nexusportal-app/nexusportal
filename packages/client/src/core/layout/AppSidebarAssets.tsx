import {useI18n} from '@infoportal/client-i18n'
import {Core} from '@/shared'
import {SidebarItem} from '@/shared/Layout/Sidebar'
import {Skeleton, useTheme} from '@mui/material'
import {useMemo, useState} from 'react'
import {UseQueryForm} from '@/core/query/form/useQueryForm'
import {Api} from '@infoportal/api-sdk'
import {mapFor, Seq, seq} from '@axanc/ts-utils'
import {SidebarItemProps} from '@/shared/Layout/Sidebar/SidebarItem.js'
import {AppSidebarFilters} from '@/core/layout/AppSidebarFilters.js'
import {AppSidebarAsset} from '@/core/layout/AppSidebarAsset.js'
import {Asset, AssetType} from '@/shared/Asset.js'
import {UseQueryAssets} from '@/core/query/useQueryAssets'

export const AppSidebarAssets = ({workspaceId}: {workspaceId: Api.WorkspaceId}) => {
  const {m} = useI18n()
  const t = useTheme()

  const queryAssets = UseQueryAssets.getAll(workspaceId)
  const assets = useMemo(() => seq(queryAssets.data ?? []), [queryAssets.data])

  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(assets)

  const formItemSize: SidebarItemProps['size'] = assets.length > 19 ? 'tiny' : assets.length > 15 ? 'small' : 'normal'

  return (
    <>
      <AppSidebarFilters assets={assets} onFilterChanges={setFilteredAssets} sx={{mx: 0.5, mb: .5, mt: 0}} />
      {queryAssets.isLoading ? (
        mapFor(4, i => (
          <SidebarItem key={i} size={formItemSize}>
            <Skeleton sx={{width: 160, height: 30}} />
          </SidebarItem>
        ))
      ) : queryAssets.data?.length === 0 ? (
        <Core.Fender
          type="empty"
          size="small"
          title={m._koboDatabase.noAccessToForm}
          sx={{mt: 2, color: t.vars.palette.text.disabled}}
        />
      ) : (
        filteredAssets.map(_ => (
          <AppSidebarAsset workspaceId={workspaceId} formItemSize={formItemSize} key={_.id} asset={_} />
        ))
      )}
    </>
  )
}

// function IconLinkedToKobo({sx, ...props}: IconProps) {
//   return (
//     <Icon fontSize="small" color="info" sx={{verticalAlign: 'middle', textAlign: 'center', ...sx}} {...props}>
//       plug_connect
//     </Icon>
//   )
// }
