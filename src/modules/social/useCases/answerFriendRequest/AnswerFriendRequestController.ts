import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AnswerFriendRequestUseCase } from "./AnswerFriendRequestUseCase";
import * as express from 'express';

export class AnswerFriendRequestController extends BaseController {
  constructor(private useCase: AnswerFriendRequestUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;
    const { requestId, action } = req.body;

    try {
      const result = await this.useCase.execute({ userId, requestId, action });
      if (result.isFailure) return this.clientError(res, result.error as string);
      return this.ok(res);
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}