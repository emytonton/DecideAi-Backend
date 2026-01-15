import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { UpdateUserProfileUseCase } from "./UpdateUserProfileUseCase";
import * as express from 'express';

export class UpdateUserProfileController extends BaseController {
  constructor(private useCase: UpdateUserProfileUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;
    const { username, avatar,email } = req.body;

    try {
      const result = await this.useCase.execute({ userId, username, avatar,email });
      
      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }
      
  
      return this.ok(res, result.getValue());
      
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}