import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteAccountUseCase } from "./DeleteAccountUseCase";
import * as express from 'express';

export class DeleteAccountController extends BaseController {
  constructor(private useCase: DeleteAccountUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId;

    try {
      const result = await this.useCase.execute(userId);
      if (result.isFailure) return this.clientError(res, result.error as string);
      
      return this.ok(res);
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}