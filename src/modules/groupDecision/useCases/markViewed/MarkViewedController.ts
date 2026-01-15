import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { MarkViewedUseCase } from "./MarkViewedUseCase";
import * as express from 'express';

export class MarkViewedController extends BaseController {
  constructor(private useCase: MarkViewedUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;
    const { decisionId } = req.body;

    try {
      const result = await this.useCase.execute({ userId, decisionId });
      
      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      return this.ok(res);
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}