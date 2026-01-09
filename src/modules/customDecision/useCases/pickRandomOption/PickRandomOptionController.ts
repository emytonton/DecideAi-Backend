import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { PickRandomOptionUseCase } from "./PickRandomOptionUseCase";
import * as express from 'express';

export class PickRandomOptionController extends BaseController {
  constructor(private useCase: PickRandomOptionUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const { listId, tempOptions } = req.body;

    try {
      const result = await this.useCase.execute({ listId, tempOptions });

      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      return this.ok(res, {
        result: result.getValue()
      });
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}