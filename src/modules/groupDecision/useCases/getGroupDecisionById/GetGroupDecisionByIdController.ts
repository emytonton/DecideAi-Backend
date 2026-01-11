import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetGroupDecisionByIdUseCase } from "./GetGroupDecisionByIdUseCase";
import * as express from 'express';

export class GetGroupDecisionByIdController extends BaseController {
  constructor(private useCase: GetGroupDecisionByIdUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params; // Pega o ID da URL

    try {
      const result = await this.useCase.execute({ 
        decisionId: id,
        userId: userId
      });

      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      return this.ok(res, result.getValue());
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}