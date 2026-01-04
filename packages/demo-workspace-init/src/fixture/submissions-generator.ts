import {Api} from '@infoportal/api-sdk'
import {Prisma} from '@infoportal/prisma'

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type SurveyNode = {
  name: string
  type: string
  relevant?: string
  select_from_list_name?: string
  repeat_count?: string
}

type Choice = {
  list_name: string
  name: string
}

type NumericRanges = Record<string, [number, number]>

/* ------------------------------------------------------------------ */
/* Utils */
/* ------------------------------------------------------------------ */

const pick = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

function randomDateBetween(start: Date, end: Date) {
  return new Date(
    start.getTime() +
    Math.random() * (end.getTime() - start.getTime()),
  )
}

function indexChoices(choices: Choice[]) {
  return choices.reduce<Record<string, string[]>>((acc, c) => {
    acc[c.list_name] ??= []
    acc[c.list_name].push(c.name)
    return acc
  }, {})
}

/* ------------------------------------------------------------------ */
/* Trend engine (NON repeat fields only) */
/* ------------------------------------------------------------------ */

type Trend = {
  base: number
  slope: number
  noise: number
}

const trendByField = new Map<string, Trend>()

function getTrend(field: string, min: number, max: number): Trend {
  if (!trendByField.has(field)) {
    trendByField.set(field, {
      base: randomInt(min, max),
      slope: randomInt(-2, 4),
      noise: Math.max(1, Math.floor((max - min) * 0.05)),
    })
  }
  return trendByField.get(field)!
}

function trendValue(
  field: string,
  step: number,
  min: number,
  max: number,
) {
  const t = getTrend(field, min, max)
  const v =
    t.base +
    t.slope * step +
    randomInt(-t.noise, t.noise)

  return Math.max(min, Math.min(max, Math.round(v)))
}

/* ------------------------------------------------------------------ */
/* Relevance */

/* ------------------------------------------------------------------ */

function isRelevant(q: SurveyNode, answers: Record<string, any>) {
  if (!q.relevant) return true
  const m = q.relevant.match(/selected\(\$\{(.+?)\},\s*'(.+?)'\)/)
  if (!m) return true
  return answers[m[1]] === m[2]
}

/* ------------------------------------------------------------------ */
/* Repeat helpers */

/* ------------------------------------------------------------------ */

function isRepeatCountField(
  field: string,
  schema: Api.Form.Schema,
) {
  return schema.survey.some(
    q =>
      q.type === 'begin_repeat' &&
      q.repeat_count?.includes(`\${${field}}`),
  )
}

function resolveRepeatCount(
  expr: string | undefined,
  answers: Record<string, any>,
  max = 20,
) {
  if (!expr) return randomInt(1, 4)
  const m = expr.match(/\$\{(.+?)\}/)
  if (!m) return randomInt(1, 4)

  const v = Number(answers[m[1]])
  if (!Number.isFinite(v) || v <= 0) return 0
  return Math.min(Math.floor(v), max)
}

/* ------------------------------------------------------------------ */
/* Value generator */

/* ------------------------------------------------------------------ */

function generateValue(
  q: SurveyNode,
  schema: Api.Form.Schema,
  choiceIndex: Record<string, string[]>,
  step: number,
  numericRanges: NumericRanges,
) {
  switch (q.type) {
    case 'text':
      return q.name.includes('id')
        ? String(randomInt(1_000_000_000, 9_999_999_999))
        : 'demo'

    case 'integer':
    case 'decimal': {
      const [min, max] =
      numericRanges[q.name] ??
      (q.type === 'integer' ? [0, 120] : [0, 50_000])

      // 🚨 repeat drivers must NOT trend
      if (isRepeatCountField(q.name, schema)) {
        return randomInt(min, max)
      }

      return trendValue(q.name, step, min, max)
    }

    case 'select_one':
      return pick(choiceIndex[q.select_from_list_name!])

    case 'select_multiple':
      return choiceIndex[q.select_from_list_name!]
        .filter(() => Math.random() > 0.6)
        .join(' ')

    case 'image':
      return ''

    default:
      return null
  }
}

/* ------------------------------------------------------------------ */
/* Main generator */

/* ------------------------------------------------------------------ */

export function generateRandomSubmissions({
  formId,
  version,
  schemaJson,
  count,
  startDate,
  endDate,
  numericRanges = {},
  maxRepeat = 20,
}: {
  formId: string
  version: number
  schemaJson: any
  count: number
  startDate: Date
  endDate: Date
  numericRanges?: NumericRanges
  maxRepeat?: number
}): Prisma.FormSubmissionCreateManyInput[] {
  const schema = schemaJson as Api.Form.Schema
  const choiceIndex = indexChoices(schema.choices ?? [])

  return Array.from({length: count}).map((_, step) => {
    const answers: Record<string, any> = {}

    for (let i = 0; i < schema.survey.length; i++) {
      const q = schema.survey[i]
      if (!q.name) continue

      /* ---------- BEGIN REPEAT ---------- */
      if (q.type === 'begin_repeat') {
        const repeatName = q.name
        const children: SurveyNode[] = []

        i++
        while (schema.survey[i]?.type !== 'end_repeat') {
          children.push(schema.survey[i])
          i++
        }

        const repeatCount = resolveRepeatCount(
          q.repeat_count,
          answers,
          maxRepeat,
        )

        answers[repeatName] = Array.from({
          length: repeatCount,
        }).map(() => {
          const row: Record<string, any> = {}
          for (const rq of children) {
            if (!rq.name) continue
            if (!isRelevant(rq, row)) continue
            row[rq.name] = generateValue(
              rq,
              schema,
              choiceIndex,
              step,
              numericRanges,
            )
          }
          return row
        })

        continue
      }

      if (q.type.startsWith('begin_')) continue
      if (q.type.startsWith('end_')) continue
      if (!isRelevant(q, answers)) continue

      answers[q.name] = generateValue(
        q,
        schema,
        choiceIndex,
        step,
        numericRanges,
      )
    }

    return {
      formId,
      id: crypto.randomUUID().replace(/-/g, '').slice(0, 10),
      uuid: crypto.randomUUID(),
      submissionTime: randomDateBetween(startDate, endDate),
      answers: {
        meta: {instanceID: 'uuid:' + crypto.randomUUID()},
        ...answers,
      },
      attachments: [],
    }
  })
}
