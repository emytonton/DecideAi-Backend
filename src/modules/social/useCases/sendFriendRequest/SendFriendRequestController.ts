import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { SendFriendRequestUseCase } from "./SendFriendRequestUseCase";
import * as express from 'express';

export class SendFriendRequestController extends BaseController {
  constructor(private useCase: SendFriendRequestUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const senderId = req.userId;
    const { receiverId } = req.body;

    try {
      const result = await this.useCase.execute({ senderId, receiverId });
      if (result.isFailure) return this.clientError(res, result.error as string);
      return this.ok(res);
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}