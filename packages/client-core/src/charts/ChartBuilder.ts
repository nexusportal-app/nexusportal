export type ChartValue = {
  value: number
  base: number
  ratio: number
  label?: string
  desc?: string
  delta?: number
}

export type ChartEntry<K extends string> = [K, ChartValue]

export class ChartBuilder {
  static readonly groupBySingle = <D, K extends string>({
    data,
    by,
    skippedKeys,
    compareBy,
    minValue,
  }: {
    data: D[]
    minValue?: number
    by: (_: D) => K
    compareBy?: (_: D) => boolean
    skippedKeys?: readonly K[]
  }): ChartEntry<K>[] => {
    const skipped = skippedKeys ? new Set(skippedKeys) : null
    const values = new Map<K, ChartValue>()
    const reference = new Map<K, number>()
    let base = 0
    let baseDelta = 0
    for (const item of data) {
      const key = by(item)
      if (skipped?.has(key)) continue
      base++
      const v = values.get(key) ?? {
        value: 0,
        base: 0,
        ratio: 0,
      }
      v.value++
      values.set(key, v)
      if (compareBy?.(item)) {
        reference.set(key, (reference.get(key) ?? 0) + 1)
        baseDelta++
      }
    }

    const result: ChartEntry<K>[] = []
    for (const [key, v] of values) {
      if (minValue && v.value <= minValue) continue

      v.base = base
      v.ratio = base ? v.value / base : 0

      if (compareBy && baseDelta) {
        const ref = reference.get(key) ?? 0
        v.delta = (v.ratio - ref / baseDelta) * 100
      }
      result.push([key, v])
    }
    result.sort((a, b) => b[1].value - a[1].value)
    return result
  }

  static readonly getPercentage = <D>({
    data,
    baseCondition,
    condition,
    compareBy,
  }: {
    data: D[]
    baseCondition?: (_: D) => boolean | undefined
    condition: (_: D) => boolean | undefined
    compareBy?: (_: D) => boolean | undefined
  }): ChartValue => {
    let value = 0
    let base = 0
    let refValue = 0
    let refBase = 0

    for (const item of data) {
      if (baseCondition && !baseCondition(item)) continue
      base++

      if (condition(item)) value++

      if (compareBy?.(item)) {
        refBase++
        if (condition(item)) refValue++
      }
    }

    const ratio = base > 0 ? value / base : 0
    const delta = compareBy && refBase > 0 ? (ratio - refValue / refBase) * 100 : undefined

    return {value, base, ratio, delta}
  }

  static readonly groupByMultiple = <D, K extends string>({
    data,
    by,
    skippedKeys,
    compareBy,
    minValue,
    basedOn = 'dataLength',
  }: {
    data: D[]
    minValue?: number
    by: (_: D) => K[] | undefined
    compareBy?: (_: D) => boolean
    skippedKeys?: readonly K[]
    basedOn?: 'dataLength' | 'flatDataLength'
  }): ChartEntry<K>[] => {
    const skipped = skippedKeys ? new Set(skippedKeys) : null

    const values = new Map<K, ChartValue>()
    const reference = new Map<K, number>()

    let base = 0
    let baseDelta = 0
    const countPerItem = basedOn === 'dataLength'

    for (const item of data) {
      const keys = by(item)
      if (!keys || keys.length === 0) continue
      const hasDelta = compareBy?.(item) ?? false
      const increment = countPerItem ? 1 : keys.length

      base += increment
      if (hasDelta) baseDelta += increment
      for (const key of keys) {
        if (skipped?.has(key)) continue

        const v = values.get(key) ?? {
          value: 0,
          base: 0,
          ratio: 0,
        }

        v.value++
        values.set(key, v)

        if (hasDelta) {
          reference.set(key, (reference.get(key) ?? 0) + 1)
        }
      }
    }
    const result: ChartEntry<K>[] = []
    for (const [key, v] of values) {
      if (minValue && v.value <= minValue) continue

      v.base = base
      v.ratio = base ? v.value / base : 0

      if (compareBy && baseDelta) {
        const ref = reference.get(key) ?? 0
        v.delta = (v.ratio - ref / baseDelta) * 100
      }

      result.push([key, v])
    }
    result.sort((a, b) => b[1].value - a[1].value)
    return result
  }
}
