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
        const errorValue = result.error;
        const errorMessage = typeof errorValue === 'string' 
            ? errorValue 
            : (errorValue as any)?.message || String(errorValue);

        if (errorMessage.includes('já está em uso') || errorMessage.includes('duplicate')) {
            return this.conflict(res, errorMessage);
        }
        return this.clientError(res, errorMessage);
      } else {
        const userCreated = result.getValue();
        return res.status(201).json(userCreated);
      }
    } catch (err: any) {
      console.log(err);
      return this.fail(res, err.message || String(err));
    }
  }
}