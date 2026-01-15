import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetMyDecisionsUseCase } from "./GetMyDecisionsUseCase";
import * as express from 'express';

export class GetMyDecisionsController extends BaseController {
  constructor(private useCase: GetMyDecisionsUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;

    try {
      const result = await this.useCase.execute(userId);
      
      if (result.isFailure) {
       return this.fail(res, new Error(result.error ? result.error.toString() : 'Erro desconhecido'));
      }

      return this.ok(res, result.getValue());
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}