import {SubmissionMapper, Submission} from './SubmissionMapper'

const indexedSchema: any = {
  int_q: {type: 'integer'},
  dec_q: {type: 'decimal'},
  date_q: {type: 'date'},
  multi_q: {type: 'select_multiple'},
  repeat_q: {type: 'begin_repeat'},

  // nested questions (same schema index)
  nested_int: {type: 'integer'},
  nested_multi: {type: 'select_multiple'},
}

const submission = {
  id: 'sub-1',
  start: null,
  end: null,
  submissionTime: '2024-04-26T23:00:27.056Z',
  submittedBy: null,
  version: null,
  validationStatus: null,
  geolocation: null,
  attachments: [],
  answers: {
    int_q: '10',
    dec_q: '2.5',
    date_q: '2024-04-26',
    multi_q: 'a b c',
    repeat_q: [
      {
        nested_int: '1',
        nested_multi: 'x y',
      },
      {
        nested_int: '2',
        nested_multi: 'y z',
      },
    ],
  },
} as any

describe('SubmissionMapper – minimal full coverage', () => {
  it('maps all supported question types', () => {
    const mapped = SubmissionMapper.mapBySchema(indexedSchema, submission as Submission)

    // integer / decimal
    expect(mapped.answers.int_q).toBe(10)
    expect(mapped.answers.dec_q).toBe(2.5)

    // date
    expect(mapped.answers.date_q).toBeInstanceOf(Date)
    expect((mapped.answers.date_q as Date).toISOString().startsWith('2024-04-26')).toBe(true)

    // select_multiple
    expect(mapped.answers.multi_q).toEqual(['a', 'b', 'c'])

    // begin_repeat + nested mapping
    const repeat = mapped.answers.repeat_q as any[]
    expect(repeat).toHaveLength(2)

    expect(repeat[0].nested_int).toBe(1)
    expect(repeat[0].nested_multi).toEqual(['x', 'y'])

    expect(repeat[1].nested_int).toBe(2)
    expect(repeat[1].nested_multi).toEqual(['y', 'z'])
  })

  it('unmaps mapped submission back to API format', () => {
    const mapped = SubmissionMapper.mapBySchema(indexedSchema, submission as Submission)
    const unmapped = SubmissionMapper.unmapBySchema(indexedSchema, mapped)

    // date → string
    expect(unmapped.answers.date_q).toBe('2024-04-26')

    // select_multiple → string
    expect(unmapped.answers.multi_q).toBe('a b c')

    // begin_repeat → recursive unmap
    const repeat = unmapped.answers.repeat_q as any[]
    expect(repeat[0].nested_multi).toBe('x y')
    expect(repeat[1].nested_multi).toBe('y z')

    // integers / decimals are intentionally not restored
    expect(unmapped.answers.int_q).toBeUndefined()
    expect(unmapped.answers.dec_q).toBeUndefined()
  })

  it('should properly handle empty select_multiple', () => {
    const mapped = SubmissionMapper.mapBySchema(indexedSchema, {
      answers: {
        multi_q: '',
      },
    } as any)
    // empty select_multiple → empty array
    expect(mapped.answers.multi_q).toStrictEqual([])
  })
})
