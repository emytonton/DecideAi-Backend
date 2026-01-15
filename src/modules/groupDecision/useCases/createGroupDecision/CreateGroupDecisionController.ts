import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateGroupDecisionUseCase } from "./CreateGroupDecisionUseCase";
import * as express from 'express';

export class CreateGroupDecisionController extends BaseController {
  constructor(private useCase: CreateGroupDecisionUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;
    const { title, options, invitedUserIds } = req.body;

    try {
      const result = await this.useCase.execute({ 
        creatorId: userId, 
        title, 
        options, 
        invitedUserIds 
      });

      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      const decision = result.getValue();

      
      return res.status(201).json({
        id: decision.id.toString(),
        creatorId: decision.creatorId,      
        title: decision.title,
        options: decision.options,
        participants: decision.participants, 
        status: decision.status,
        createdAt: decision.createdAt
      });

    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}