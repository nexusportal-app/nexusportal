import {Api} from '@infoportal/api-sdk'
import {useMemo} from 'react'
import {ReactGridLayoutProps, ResponsiveProps} from 'react-grid-layout'

export type UseDashboardGridLayoutResponsive = Pick<
  ResponsiveProps,
  'layouts' | 'breakpoints' | 'cols' | 'margin' | 'rowHeight' | 'width'
>

const getSpacing = (spacing?: number) => spacing ? spacing * 2 : 16
const rowHeight = 1

export const useDashboardGridLayoutResponsive = (
  widgets: Api.Dashboard.Widget[],
  dashboard: Api.Dashboard,
): UseDashboardGridLayoutResponsive => {
  const spacing = getSpacing(dashboard.theme.spacing )

  const layouts = useMemo(() => {
    const lg = widgets.map(_ => ({i: _.id, ..._.position}))
    const max = Math.max(...widgets.map(_ => _.position.h + _.position.y))
    const sm = widgets.map((w, i) => {
      let x = w.position.x
      let y = w.position.y
      if (x >= 6) {
        x = x - 6
        y = y + max + 1
      }
      return {
        i: w.id,
        ...w.position,
        x,
        y,
      }
    })
    return {lg, sm}
  }, [widgets])
  return {
    layouts,
    breakpoints: {lg: 1200, md: 769, sm: 768, xs: 480, xxs: 0},
    cols: {lg: 12, md: 12, sm: 6, xs: 6, xxs: 6},
    margin: [spacing, spacing],
    rowHeight,
    width: 1200,
  }
}

export type UseDashboardGridLayoutStatic = ReactGridLayoutProps

export const useDashboardGridLayoutStatic = (
  widgets: Api.Dashboard.Widget[],
  dashboard: Api.Dashboard,
): UseDashboardGridLayoutStatic => {
  const spacing = getSpacing(dashboard.theme.spacing )

  const layout = useMemo(() => {
    return widgets.map(w => ({
      i: w.id,
      ...w.position,
    }))
  }, [widgets])

  return {
    layout,
    cols: 12,
    margin: [spacing, spacing] as [number, number],
    rowHeight,
    width: 1200,
  }
}
