import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { LoginUseCase } from "./LoginUseCase";
import { LoginDTO } from "./LoginDTO";
import * as express from 'express';

export class LoginController extends BaseController {
  private useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const dto: LoginDTO = req.body as LoginDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isFailure) {
        return this.clientError(res, result.error as string); 
      } else {
        const loginData = result.getValue();
        return this.ok(res, loginData);
      }
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}