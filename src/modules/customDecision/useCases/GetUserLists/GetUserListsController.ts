import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserListsUseCase } from "./GetUserListsUseCase";
import * as express from 'express';

export class GetUserListsController extends BaseController {
  constructor(private useCase: GetUserListsUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;

    try {
      const result = await this.useCase.execute(userId);
      return this.ok(res, result.getValue());
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}