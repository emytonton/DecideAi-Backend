import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteUserListUseCase } from "./DeleteUserListUseCase";
import * as express from 'express';

export class DeleteUserListController extends BaseController {
  constructor(private useCase: DeleteUserListUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const listId = req.params.id;

    try {
      await this.useCase.execute({ listId });
      return this.ok(res);
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}