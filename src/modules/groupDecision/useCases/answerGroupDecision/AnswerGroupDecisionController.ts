import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AnswerGroupDecisionUseCase } from "./AnswerGroupDecisionUseCase";
import * as express from 'express';

export class AnswerGroupDecisionController extends BaseController {
  constructor(private useCase: AnswerGroupDecisionUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;
    const { decisionId, voteOption, decline } = req.body;

    try {
      const result = await this.useCase.execute({
        userId,
        decisionId,
        voteOption,
        decline
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