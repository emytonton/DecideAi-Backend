import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { RemoveFriendUseCase } from "./RemoveFriendUseCase";
import * as express from 'express';

export class RemoveFriendController extends BaseController {
  constructor(private useCase: RemoveFriendUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId;
    const { friendId } = req.body;

    try {
      const result = await this.useCase.execute({ userId, friendId });
      if (result.isFailure) return this.clientError(res, result.error as string);
      return this.ok(res);
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}