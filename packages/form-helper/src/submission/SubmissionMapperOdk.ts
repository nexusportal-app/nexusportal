import {Api} from '@infoportal/api-sdk'
import {Obj} from '@axanc/ts-utils'

type Value = string | string[] | number | undefined
type Answers = {
  [key: string]: Value | Answers[]
}

/**
 * Ingestion mapper (External sources → Database)
 *
 * Responsibility:
 * - Normalize raw submissions coming from external sources (Kobo, ODK Web Forms, etc.)
 * - Ensure the database stores canonical, source-independent types.
 *
 * What this mapper MUST handle:
 * - select_multiple → string[]
 * - integer / decimal → number (required for Kobo, with ODK web-forms numbers are actual numbers)
 *
 * What this mapper MUST NOT handle:
 * - Date conversion (DB stores dates as strings)
 * - UI / runtime conveniences
 *
 * Important:
 * - This mapper is source-aware.
 * - It should be applied exactly once, at ingestion time.
 * - Do NOT reuse this mapper when reading from the DB.
 */
export class SubmissionMapperOdk {

  static mapAnswers(
    indexedSchema: Record<string, Api.Form.Question | undefined>,
    answers: Api.Submission['answers'],
  ): Answers {
    const res = {} as Answers

    Obj.entries(answers).forEach(([question, answer]) => {
      const type = indexedSchema[question]?.type
      if (!type || answer === undefined) {
        res[question] = answer
        return
      }

      switch (type) {
        case 'select_multiple':
          res[question] =
            answer === '' ? [] : (answer as string).split(' ')
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
