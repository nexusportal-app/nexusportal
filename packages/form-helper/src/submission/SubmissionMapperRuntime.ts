import {Api} from '@infoportal/api-sdk'
import {Obj} from '@axanc/ts-utils'
import {nanoid} from 'nanoid'

type Value = string | string[] | number | undefined | Date
type Answers = {
  [key: string]: Value | Answers[]
}
type SubmissionRuntimeMapped = Api.Submission<Answers>

/**
 * Runtime mapper (Database → App / Server / Client)
 *
 * Responsibility:
 * - Adapt database-stored submissions for runtime usage in the app.
 * - Provide developer-friendly types without mutating DB semantics.
 *
 * What this mapper MUST handle:
 * - date / today → Date
 *
 * What this mapper MUST NOT handle:
 * - select_multiple (already normalized in DB)
 * - integer / decimal coercion
 * - Source-specific logic (Kobo / ODK)
 *
 * Important:
 * - This mapper assumes the DB already contains canonical data.
 * - It is safe to use multiple times in server or client code.
 * - Never use this mapper during ingestion or persistence.
 */
export class SubmissionMapperRuntime {
  static readonly genId = (): Api.SubmissionId => nanoid(10)

  static map(
    indexedSchema: Record<string, Api.Form.Question | undefined>,
    submission: Api.Submission,
  ): SubmissionRuntimeMapped {
    const {answers, ...meta} = submission
    return {
      ...meta,
      answers: this.mapAnswers(indexedSchema, answers),
    }
  }

  private static mapAnswers(
    indexedSchema: Record<string, Api.Form.Question | undefined>,
    answers: Api.Submission['answers'],
  ): Answers {
    const res: Answers = {}

    Obj.entries(answers).forEach(([question, answer]) => {
      const type = indexedSchema[question]?.type
      if (!type || answer === undefined) {
        res[question] = answer
        return
      }

      switch (type) {
        case 'date':
        case 'today':
          res[question] = new Date(answer as string)
          break

        case 'begin_repeat':
          res[question] = Array.isArray(answer)
            ? answer.map(a =>
              this.mapAnswers(indexedSchema, a),
            )
            : answer
          break

        default:
          res[question] = answer
      }
    })

    return res
  }
}
