import {NextFunction, Request, Response} from 'express'
import {HttpError} from '@infoportal/api-sdk'
import {PrismaClient} from '@infoportal/prisma'
import {SubmissionImportService} from '../../../feature/form/submission/SubmissionImportService.js'
import * as fs from 'node:fs'

export class ControllerKoboApiXlsImport {
  constructor(
    private prisma: PrismaClient,
    private service = new SubmissionImportService(prisma),
  ) {}

  readonly handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next(new HttpError.NoFileUploaded('No file was uploaded'))
    }
    const formId: string = req.params.formId
    const action = req.query.action as 'create' | 'update'
    await this.service.processData(formId, req.file.path, action)
    fs.unlink(req.file.path, () => {})
    res.send({})
  }
}
