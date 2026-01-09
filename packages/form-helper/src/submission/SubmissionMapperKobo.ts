import {Kobo, KoboSubmissionFormatter} from 'kobo-sdk'
import {Api} from '@infoportal/api-sdk'
import {fnSwitch, Obj} from '@axanc/ts-utils'
import {SubmissionMapperRuntime} from './SubmissionMapperRuntime.js'

export type IndexedSchema = Record<string, Api.Form.Question | undefined>

type Type = string | string[] | Date | number | undefined

type Answers = {
  [key: string]: Type | Answers[]
}

export type SubmissionKoboMapped = Omit<Api.Submission.Meta, 'originId'> & {
  lastValidatedTimestamp?: number
  formId: Api.FormId
  originId: string
  answers: Record<string, any>
}

export class SubmissionMapperKobo {
  static readonly _IP_VALIDATION_STATUS_EXTRA = '_IP_VALIDATION_STATUS_EXTRA'

  static readonly mapValidation = {
    fromKobo: (_: Kobo.Submission.Raw): undefined | Api.Submission.Validation => {
      if (_._validation_status?.uid)
        return fnSwitch(_._validation_status.uid, {
          validation_status_on_hold: Api.Submission.Validation.Pending,
          validation_status_approved: Api.Submission.Validation.Approved,
          validation_status_not_approved: Api.Submission.Validation.Rejected,
          no_status: undefined,
        })
      if (_[this._IP_VALIDATION_STATUS_EXTRA]) {
        return Api.Submission.Validation[_._IP_VALIDATION_STATUS_EXTRA as keyof typeof Api.Submission.Validation]
      }
    },
    toKobo: (
      _?: Api.Submission.Validation,
    ): {
      _IP_VALIDATION_STATUS_EXTRA?: Api.Submission.Validation
      _validation_status?: Kobo.Submission.Validation
    } => {
      if (_ === Api.Submission.Validation.Flagged || _ === Api.Submission.Validation.UnderReview) {
        return {[this._IP_VALIDATION_STATUS_EXTRA]: _}
      }
      return {
        _validation_status: fnSwitch(
          _!,
          {
            [Api.Submission.Validation.Pending]: Kobo.Submission.Validation.validation_status_on_hold,
            [Api.Submission.Validation.Approved]: Kobo.Submission.Validation.validation_status_approved,
            [Api.Submission.Validation.Rejected]: Kobo.Submission.Validation.validation_status_not_approved,
          },
          () => Kobo.Submission.Validation.no_status,
        ),
      }
    },
  }

  static readonly map = (formId: Api.FormId, indexedSchema: IndexedSchema, k: Kobo.Submission.Raw): SubmissionKoboMapped => {
    const {
      ['formhub/uuid']: formhubUuid,
      ['meta/instanceId']: instanceId,
      _id,
      start,
      end,
      __version__,
      _xform_id_string,
      _uuid,
      _attachments,
      _status,
      _geolocation,
      _submission_time,
      _tags,
      _notes,
      _validation_status,
      _submitted_by,
      ...answers
    } = k
    const submissionTime = new Date(_submission_time)
    return {
      id: SubmissionMapperRuntime.genId(),
      originId: '' + _id,
      // koboFormId: _xform_id_string,
      attachments: _attachments ?? [],
      geolocation: _geolocation.filter(_ => _ !== null) as [number, number],
      start: start ?? submissionTime,
      end: end ?? submissionTime,
      submissionTime,
      version: __version__,
      uuid: _uuid as Api.Uuid,
      submittedBy: _submitted_by,
      validationStatus: this.mapValidation.fromKobo(k),
      lastValidatedTimestamp: _validation_status?.timestamp,
      formId,
      // validatedBy: _validation_status?.by_whom,
      answers: this.mapAnswersBySchema(indexedSchema, answers),
    }
  }

  private static readonly mapAnswersBySchema = (indexedSchema: IndexedSchema, answers: Record<string, any>) => {
    const answersUngrouped = KoboSubmissionFormatter.removePath(answers)
    const res: Answers = {...answersUngrouped}
    Obj.entries(answersUngrouped).forEach(([question, answer]) => {
      const type = indexedSchema[question]?.type
      if (!type || answer === undefined) return
      switch (type) {
        case 'integer':
        case 'decimal': {
          res[question] =
            typeof answer === 'string' && answer !== '' && !isNaN(+answer)
              ? +answer
              : answer
          break
        }
        case 'select_multiple': {
          res[question] = answer === '' ? [] : (answer as string).split(' ')
          break
        }
        case 'begin_repeat': {
          if (res[question]) {
            res[question] = (res[question] as any).map((_: any) => this.mapAnswersBySchema(indexedSchema, _))
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
