import {Obj, seq} from '@axanc/ts-utils'
import {Api} from '@infoportal/api-sdk'
import {removeHtml} from '@infoportal/common'
import {SchemaInspector} from '../schema/SchemaInspector.js'

export class SchemaTsInterfaceBuilder {
  constructor(
    private name: string,
    private schema: Api.Form.Schema,
    private langIndex: number = 0,
    private skipChoicesOverLimit = 100,
    schemaInspector?: SchemaInspector,
  ) {
    this.schemaInspector = schemaInspector ?? new SchemaInspector(this.schema, this.langIndex)
  }

  private readonly schemaInspector: SchemaInspector

  private readonly ignoredQuestionTypes = new Set<Api.Form.QuestionType>([
    'start',
    'end',
    'begin_group',
    'end_group',
    'end_repeat',
  ])

  private indent = (str: string, level = 1): string =>
    str
      .split('\n')
      .map(line => (line ? '  '.repeat(level) + line : line))
      .join('\n')

  private block = (lines: string[], level = 1): string =>
    `{\n${this.indent(lines.join('\n'), level)}\n}`

  private generateChoices = (): string => {
    const byList = seq(this.schema.choices).groupBy(_ => _.list_name)

    const entries = Obj.entries(byList).map(
      ([listName, choices]) =>
        `${listName}: [${choices.map(c => `'${c.name}'`).join(', ')}] as const,`,
    )

    return [
      `export type Choice<List extends keyof typeof choices> = (typeof choices)[List][number]`,
      '',
      `const choices = ${this.block(entries)}`,
    ].join('\n')
  }

  private buildType = (question: Api.Form.Question): string => {
    switch (question.type) {
      case 'select_one':
      case 'select_multiple': {
        if (!question.select_from_list_name) return 'string'
        const count =
          this.schemaInspector.lookup.choicesIndex[question.select_from_list_name]?.length ?? 0
        if (count > this.skipChoicesOverLimit) return 'string'
        return `Choice<'${question.select_from_list_name}'>${question.type === 'select_multiple' ? '[]' : ''}`
      }
      case 'integer':
      case 'decimal':
        return 'number'
      case 'date':
      case 'datetime':
        return 'Date'
      case 'begin_repeat': {
        const questions = this.schemaInspector.lookup.group.getByName(question.name)?.questions ?? []
        return `${this.generateInterface(questions, question.name)}[]`
      }
      default:
        return 'string'
    }
  }

  private sanitizeLabel = (label: string, maxLength = 100): string =>
    removeHtml(label).replace(/\r?\n/g, ' ').slice(0, maxLength)

  private generateInterface = (
    questions: Api.Form.Question[],
    parentGroupName?: string,
  ): string => {
    const fields = questions
      .filter(q => {
        if (this.ignoredQuestionTypes.has(q.type)) return false
        const group = this.schemaInspector.lookup.group.getByQuestionName(q.name)
        return parentGroupName ? group?.name === parentGroupName : !group
      })
      .map(q => {
        const comment = `// [${q.type}] ${this.sanitizeLabel(
          this.schemaInspector.translate.question(q.name),
        )} (${q.$xpath})`

        const field = `'${q.name}'${q.required ? '' : '?'}: ${this.buildType(q)};`
        return `${comment}\n${field}`
      })

    return this.block(fields)
  }

  readonly build = (): string => {
    return [
      `export namespace ${this.name} {`,
      this.indent(`export type Type = ${this.generateInterface(this.schema.survey)}`),
      '',
      this.indent(this.generateChoices()),
      `}`,
    ].join('\n')
  }
}
