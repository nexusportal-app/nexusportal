import {Obj} from '@axanc/ts-utils'
import {Api} from '@infoportal/api-sdk'

type SubmissionMappedType = string | string[] | Date | number | undefined

type SubmissionMapped = {
  [key: string]: SubmissionMappedType | SubmissionMapped[]
}

export type Submission = Api.Submission<SubmissionMapped>

export class SubmissionMapper {
  static readonly mapBySchema = (
    indexedSchema: Record<string, Api.Form.Question | undefined>,
    submissions: Api.Submission,
  ): Submission => {
    const {answers, ...meta} = submissions
    return {...meta, answers: SubmissionMapper.mapAnswerBySchema(indexedSchema, answers)}
  }

  static readonly unmapBySchema = (
    indexedSchema: Record<string, Api.Form.Question | undefined>,
    mapped: Submission,
  ): Api.Submission => {
    const {answers, ...meta} = mapped
    return {...meta, answers: SubmissionMapper.unmapAnswersBySchema(indexedSchema, answers)}
  }

  private static readonly mapAnswerBySchema = (
    indexedSchema: Record<string, Api.Form.Question | undefined>,
    answers: Api.Submission['answers'],
  ): SubmissionMapped => {
    const res: SubmissionMapped = {...answers}
    Obj.entries(answers).forEach(([question, answer]) => {
      const type = indexedSchema[question]?.type
      if (!type || answer === undefined) return
      switch (type) {
        case 'integer':
        case 'decimal': {
          res[question] = isNaN(answer) ? answer : +answer
          break
        }
        case 'today':
        case 'date': {
          res[question] = new Date(answer as Date)
          break
        }
        case 'select_multiple': {
          res[question] = answer === '' ? [] : (answer as string).split(' ')
          break
        }
        case 'begin_repeat': {
          if (res[question]) {
            res[question] = (res[question] as any).map((_: any) => SubmissionMapper.mapAnswerBySchema(indexedSchema, _))
          }
          break
        }
        default:
          break
      }
    })
    return res
  }

  private static readonly unmapAnswersBySchema = (
    indexedSchema: Record<string, Api.Form.Question | undefined>,
    answers: SubmissionMapped,
  ): Api.Submission['answers'] => {
    const res: Api.Submission['answers'] = {}
    Obj.entries(answers).forEach(([question, answer]) => {
      const type = indexedSchema[question]?.type
      if (!type || !answer) return
      switch (type) {
        case 'today':
        case 'date': {
          if (answer instanceof Date) {
            res[question] = answer.toISOString().split('T')[0]
          }
          break
        }
        case 'select_multiple': {
          if (Array.isArray(answer)) {
            res[question] = answer.join(' ')
          }
          break
        }
        case 'begin_repeat': {
          if (Array.isArray(answer)) {
            res[question] = (answer as SubmissionMapped[]).map(item =>
              SubmissionMapper.unmapAnswersBySchema(indexedSchema, item),
            )
          }
          break
        }
        default:
          break
      }
    })
    return res
  }
}
