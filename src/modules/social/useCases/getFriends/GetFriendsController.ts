import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetFriendsUseCase } from "./GetFriendsUseCase";
import * as express from 'express';

export class GetFriendsController extends BaseController {
  constructor(private useCase: GetFriendsUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string ;

    try {
      const result = await this.useCase.execute(userId);
      return this.ok(res, result.getValue());
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}