import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { UpdateUserListUseCase } from "./UpdateUserListUseCase";
import * as express from 'express';

export class UpdateUserListController extends BaseController {
  constructor(private useCase: UpdateUserListUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId as string;
    const listId = req.params.id; 
    const { title, options } = req.body; 

    try {
      const result = await this.useCase.execute({ 
        userId, 
        listId, 
        title, 
        options 
      });

      if (result.isFailure) {
        
        const error = result.error as string;
        if (error.includes("permissão")) {
          return this.clientError(res, error); 
        }
        return this.clientError(res, error);
      }

      return this.ok(res, { message: "Lista atualizada com sucesso." });
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}