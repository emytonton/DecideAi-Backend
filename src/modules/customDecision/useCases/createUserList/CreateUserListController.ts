import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserListUseCase } from "./CreateUserListUseCase";
import * as express from 'express';

export class CreateUserListController extends BaseController {
  constructor(private useCase: CreateUserListUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;
    const { title, options } = req.body;

    try {
      const result = await this.useCase.execute({ userId, title, options });

      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      const list = result.getValue();

  
      return res.status(201).json({
        id: list.id.toString(),
        userId: list.userId,
        title: list.title,
        options: list.options,
        createdAt: list.createdAt
      });

    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}