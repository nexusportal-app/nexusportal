import {PrismaClient} from '@infoportal/prisma'
import {Logger} from '@infoportal/common'

type Context = {formId?: string; actionId?: string; submissionId?: string}

export class FormActionErrorHandler {
  constructor(
    private prisma: PrismaClient,
    private log: Logger,
  ) {
  }

  async handle(err: unknown, ctx: Context = {}) {
    const error = err instanceof Error ? err : new Error(String(err))
    this.log.error((error.name + ': ' + error.message + ' > ' + JSON.stringify({stack: error.stack, ...ctx})).slice(0, 2500))
    if (ctx.actionId) {
      await this.prisma.formActionLog.create({
        data: {
          type: 'error',
          actionId: ctx.actionId,
          title: error.name,
          details: error.message,
        },
      })
    }
  }
}
