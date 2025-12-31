import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import * as express from 'express';

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const dto: CreateUserDTO = req.body as CreateUserDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isFailure) {
       
        const error = result.error as string;
        if (error.includes('já está em uso')) {
            return this.conflict(res, error);
        }
        return this.clientError(res, error);
      } else {
        return this.created(res);
      }
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}