import {Obj, seq} from '@axanc/ts-utils'
import {ReactNode, useMemo} from 'react'
import {BarChartData, ChartBar} from './ChartBar.js'
import {ChartBuilder, ChartEntry, ChartValue} from './ChartBuilder.js'
interface ChartBarBaseProps<D extends Record<string, any>, K extends string> {
  onClickData?: (_: K) => void
  checked?: K[]
  data: D[]
  limit?: number
  labels?: Record<K, ReactNode>
  skippedKeys?: K[]
  minValue?: number
  compareBy?: (_: D) => boolean
  orderKeys?: K[]
  /** @deprecated */
  onToggle?: (_: K) => void
  hideValue?: boolean
  basedOn?: undefined
  dense?: boolean
}

type ChartBarByPropsMultiple<D extends Record<string, any>, K extends string> = ChartBarBaseProps<D, K> & {
  multiple: true
  by: (_: D) => K[] | undefined
  basedOn?: 'dataLength' | 'flatDataLength'
}

type ChartBarByPropsSingle<D extends Record<string, any>, K extends string> = ChartBarBaseProps<D, K> & {
  multiple?: false
  by: (_: D) => K
  basedOn?: undefined
}

export type ChartBarByProps<D extends Record<string, any>, K extends string> =
  | ChartBarByPropsMultiple<D, K>
  | ChartBarByPropsSingle<D, K>

export const ChartBarBy = <D extends Record<string, any>, K extends string>({
  by,
  compareBy,
  data,
  limit,
  onClickData,
  checked,
  labels,
  hideValue,
  skippedKeys,
  orderKeys,
  minValue,
  basedOn,
  multiple,
  dense,
}: ChartBarByProps<D, K>) => {
  const computed: ChartEntry<K>[] = useMemo(() => {
    if (multiple)
      return ChartBuilder.groupByMultiple({
        data,
        by,
        skippedKeys,
        basedOn,
        minValue,
        compareBy,
      })
    return ChartBuilder.groupBySingle({
      data,
      by,
      skippedKeys,
      compareBy,
      minValue,
    })
  }, [data, by, minValue, multiple, basedOn, skippedKeys, compareBy])

  const result = useMemo(() => {
    const sliced = computed.slice(0, limit)
    return orderKeys
      ? seq(sliced)
          .sortByManual(_ => _[0], orderKeys)
          .get()
      : sliced
  }, [limit, computed, orderKeys, labels])

  return (
    <ChartBar
      hideValue={hideValue}
      data={result}
      onClickData={_ => onClickData?.(_)}
      checked={checked}
      dense={dense}
      labels={labels}
      // labels={
      //   !onToggle
      //     ? undefined
      //     : seq(Obj.keys(res)).reduceObject<Record<string, ReactNode>>(option => [
      //         option,
      //         <Checkbox
      //           key={option}
      //           size="small"
      //           checked={checked?.[option] ?? false}
      //           onChange={() => onToggle(option)}
      //         />,
      //       ])
      // }
    />
  )
}
