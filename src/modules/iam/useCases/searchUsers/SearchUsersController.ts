import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { SearchUsersUseCase } from "./SearchUsersUseCase";
import * as express from 'express';

export class SearchUsersController extends BaseController {
  constructor(private useCase: SearchUsersUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const query = req.query.q as string;

    try {
      const result = await this.useCase.execute(query || '');
      return this.ok(res, result.getValue());
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}