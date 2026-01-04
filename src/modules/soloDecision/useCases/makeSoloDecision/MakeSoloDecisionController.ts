import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { MakeSoloDecisionUseCase } from "./MakeSoloDecisionUseCase";
import * as express from 'express';

export class MakeSoloDecisionController extends BaseController {
  constructor(private useCase: MakeSoloDecisionUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const { category, filter1, filter2 } = req.body;

    if (!category) {
      return this.clientError(res, "Categoria é obrigatória.");
    }

    try {
      const result = await this.useCase.execute({
        category,
        primaryFilter: filter1,
        secondaryFilter: filter2
      });

      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      const option = result.getValue();

      return this.ok(res, {
        id: option.id.toString(),
        title: option.title,
        category: option.category,
        details: `${option.primaryFilter} | ${option.secondaryFilter}`,
        imageUrl: option.imageUrl
      });
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}