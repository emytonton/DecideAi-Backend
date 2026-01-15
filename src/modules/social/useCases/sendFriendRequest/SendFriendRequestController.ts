import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { SendFriendRequestUseCase } from "./SendFriendRequestUseCase";
import * as express from 'express';

export class SendFriendRequestController extends BaseController {
  constructor(private useCase: SendFriendRequestUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const senderId = req.userId as string;
    const { receiverId } = req.body;

    try {
      const result = await this.useCase.execute({ senderId, receiverId });
      
      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      const request = result.getValue();

      
      return this.ok(res, {
        id: request.id.toString(), 
        senderId: request.senderId, 
        receiverId: request.receiverId, 
        status: request.status, 
        createdAt: request.createdAt 
      });

    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}