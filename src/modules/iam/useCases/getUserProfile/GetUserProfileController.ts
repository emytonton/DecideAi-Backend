import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";
import * as express from 'express';

export class GetUserProfileController extends BaseController {
  constructor(private useCase: GetUserProfileUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    
    // @ts-ignore
    const userId = req.userId;

    try {
      const result = await this.useCase.execute(userId);
      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }
      return this.ok(res, result.getValue());
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}