import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { UpdateNotificationTokenUseCase } from "./UpdateNotificationTokenUseCase";
import * as express from 'express';

export class UpdateNotificationTokenController extends BaseController {
  constructor(private useCase: UpdateNotificationTokenUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId;
    const { token } = req.body;

    try {
      const result = await this.useCase.execute({ userId, token });

      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      return this.ok(res);
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}