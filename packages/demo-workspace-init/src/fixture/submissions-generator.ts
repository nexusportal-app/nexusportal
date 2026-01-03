import {Api} from '@infoportal/api-sdk'
import {Prisma} from '@infoportal/prisma'

type SurveyNode = {
  name: string
  type: string
  required?: boolean
  relevant?: string
  select_from_list_name?: string
}

type Choice = {
  list_name: string
  name: string
}

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

function indexChoices(choices: Choice[]) {
  return choices.reduce<Record<string, string[]>>((acc, c) => {
    acc[c.list_name] ??= []
    acc[c.list_name].push(c.name)
    return acc
  }, {})
}

function generateValue(q: SurveyNode, choiceIndex: Record<string, string[]>) {
  switch (q.type) {
    case 'text':
      return q.name.includes('id') ? String(randomInt(1000000000, 9999999999)) : 'demo'

    case 'integer':
      return randomInt(0, 80)

    case 'decimal':
      return randomInt(100, 50000)

    case 'select_one':
      return pick(choiceIndex[q.select_from_list_name!])

    case 'select_multiple':
      return choiceIndex[q.select_from_list_name!].filter(() => Math.random() > 0.5).join(' ')

    case 'image':
      return ''

    default:
      return null
  }
}

function isRelevant(q: SurveyNode, answers: Record<string, any>): boolean {
  if (!q.relevant) return true

  const match = q.relevant.match(/selected\(\$\{(.+?)\},\s*'(.+?)'\)/)

  if (!match) return true

  const [, field, value] = match
  return answers[field] === value
}

export function generateRandomSubmission({
  formId,
  version,
  schemaJson,
}: {
  formId: string
  schemaJson: any
  version: number
}): Prisma.FormSubmissionCreateManyInput {
  const schema = schemaJson as Api.Form.Schema
  const choiceIndex = indexChoices(schema.choices ?? [])
  const answers: Record<string, any> = {}

  for (let i = 0; i < schema.survey.length; i++) {
    const q = schema.survey[i]

    // Skip non-data nodes
    if (!q.name) continue
    if (q.type.startsWith('begin_')) continue
    if (q.type.startsWith('end_')) continue

    // Repeat handling
    if (q.type === 'begin_repeat') {
      const repeatName = q.name
      const repeatQuestions: SurveyNode[] = []

      i++
      while (schema.survey[i]?.type !== 'end_repeat') {
        repeatQuestions.push(schema.survey[i])
        i++
      }

      const count = randomInt(1, 5)
      answers[repeatName] = Array.from({length: count}).map(() => {
        const row: Record<string, any> = {}
        for (const rq of repeatQuestions) {
          if (!rq.name) continue
          row[rq.name] = generateValue(rq, choiceIndex)
        }
        return row
      })

      continue
    }

    // Relevance
    if (!isRelevant(q, answers)) continue

    answers[q.name] = generateValue(q, choiceIndex)
  }

  return {
    formId,
    id: crypto.randomUUID().replace(/-/g, '').slice(0, 10),
    uuid: crypto.randomUUID(),
    submissionTime: new Date(),
    answers: {
      meta: {instanceID: 'uuid:' + crypto.randomUUID()},
      ...answers,
    },
    attachments: [],
  }
}
