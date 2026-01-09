import {forwardRef, ReactNode} from 'react'
import {Box, BoxProps, Icon, SxProps, useTheme} from '@mui/material'
import {styleUtils, Txt} from '@infoportal/client-core'

export const ChoicesMapperPanel = forwardRef(({children, sx, ...props}: BoxProps, ref: any) => {
  const t = useTheme()
  return (
    <Box
      ref={ref}
      sx={{
        border: '1px solid',
        borderColor: t.vars.palette.divider,
        borderRadius: styleUtils(t).color.input.default.borderRadius,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
})

export function ChoiceMapper({
  before,
  question,
  choiceName,
  children,
  label,
  sx,
}: {
  label: string
  before?: ReactNode
  children: ReactNode
  question: string
  choiceName: string
  sx?: SxProps
}) {
  const t = useTheme()
  return (
    <Box
      sx={{
        '&:not(:last-of-type)': {
          borderBottom: '1px solid',
          borderColor: t.vars.palette.divider,
        },
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 0.5,
        ...sx,
        // mb: 0.5,
      }}
    >
      {before}
      <Txt truncate title={choiceName} color="hint" sx={{flex: 1}}>
        {label}
      </Txt>
      <Icon color="disabled">arrow_forward</Icon>
      <Box sx={{flex: 1}}>{children}</Box>
    </Box>
  )
}
