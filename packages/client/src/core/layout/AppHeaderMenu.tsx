import React, {ReactNode, useMemo} from 'react'
import {useSession} from '@/core/Session/SessionContext'
import {Box, BoxProps, Chip, Icon, Popover, SxProps, useTheme} from '@mui/material'
import {useI18n} from '@infoportal/client-i18n'
import {Core, visitorGradient} from '@/shared'
import {AppAvatar} from '@/shared/AppAvatar'
import {Api} from '@infoportal/api-sdk'
import {UseQueryWorkspace} from '@/core/query/workspace/useQueryWorkspace.js'
import {isVisitorAccount} from '@infoportal/demo-workspace-init/utils'
import {useNavigate} from '@tanstack/react-router'

const Row = ({
  icon,
  sxIcon,
  sxText,
  children,
  sx,
}: {
  icon: string
  sxText?: SxProps
  sxIcon?: SxProps
  sx?: SxProps
  children: ReactNode
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1.5,
        ...sx,
      }}
    >
      <Icon sx={{mr: 1, color: t => t.vars.palette.text.secondary, ...sxIcon}}>{icon}</Icon>
      <Core.Txt block color="hint" sx={sxText}>
        {children}
      </Core.Txt>
    </Box>
  )
}

export const accessLevelIcon: Record<Api.AccessLevel, string> = {
  Admin: 'shield_person',
  Read: 'visibility',
  Write: 'edit',
}

export const AccessBadge = ({accessLevel}: {accessLevel: Api.AccessLevel}) => {
  return (
    <Chip
      sx={{ml: 1}}
      color="info"
      icon={<Icon>{accessLevelIcon[accessLevel]}</Icon>}
      variant="filled"
      size="small"
      label={accessLevel}
    />
  )
}

export const AccessLevelRow = ({accessLevel, sx}: {sx?: SxProps; accessLevel: Api.AccessLevel}) => {
  const {m} = useI18n()
  return (
    <Row icon="badge" sx={sx}>
      {m.access}
      <AccessBadge accessLevel={accessLevel} />
    </Row>
  )
}

export const AppHeaderMenu = ({
  workspaceId,
  sx,
  ...props
}: {workspaceId?: Api.WorkspaceId} & Partial<Omit<BoxProps, 'borderColor'>>) => {
  const t = useTheme()
  const {user, originalEmail, revertConnectAs, logout} = useSession()
  const me = user
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const open = !!anchorEl
  const queryWorkspace = UseQueryWorkspace.get()
  const navigate = useNavigate()

  const currentWorkspace = useMemo(() => {
    return queryWorkspace.data?.find(_ => _.id === workspaceId)
  }, [queryWorkspace.data])

  const {m} = useI18n()
  if (!me) {
    return <></>
  }

  return (
    <>
      <AppAvatar onClick={e => setAnchorEl(e.currentTarget)} size={32} email={me.email} {...props} sx={originalEmail ? {
        border: '2px solid rgba(0, 0, 0, .15) !important',
        background: `linear-gradient(90deg, ${visitorGradient[0]}, ${visitorGradient[1]}, ${visitorGradient[2]}, ${visitorGradient[1]}, ${visitorGradient[0]})`,
        backgroundSize: '200% 200% !important',
        animation: 'gradientSpin 4s linear infinite',
        // color: '#fff',
        '@keyframes gradientSpin': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      } : undefined} />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={() => setAnchorEl(null)}
        open={open}
      >
        <Box sx={{maxWidth: 400}}>
          <Box sx={{p: 2}}>
            <Core.Txt bold block size="big" mb={1}>
              {me.name}
            </Core.Txt>
            <Row icon="email">{me.email}</Row>
            {me.job && <Row icon="work">{me.job}</Row>}
            {currentWorkspace?.level && <AccessLevelRow accessLevel={currentWorkspace?.level} />}

            {originalEmail && (
              <Box sx={{
                borderRadius: t.vars.shape.borderRadius,
                p: 1,
                border: '2px solid transparent',
                background: `linear-gradient(${t.vars?.palette.background.paper}, ${t.vars?.palette.background.paper}) padding-box, linear-gradient(45deg, ${visitorGradient[0]}, ${visitorGradient[1]}, ${visitorGradient[2]}) border-box`,
              }}>
                <div>
                  Signed in as <b>{user.email}</b>.<br />
                  Switch back to <b>{originalEmail}</b>:
                </div>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Core.Btn
                    sx={{mt: 1}}
                    loading={revertConnectAs.isPending}
                    onClick={() => {
                      revertConnectAs.mutate()
                      navigate({to: '/'})
                    }}
                    icon="exit_to_app"
                    size="small"
                  >
                    {m.switchBack}
                  </Core.Btn>
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{px: 2}}>
            <Core.Btn icon="logout" variant="outlined" onClick={logout} sx={{mb: 2}}>
              {m.logout}
            </Core.Btn>
          </Box>
        </Box>
      </Popover>
    </>
  )
}
