import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import * as express from 'express';

export class UpdateUserAvatarController extends BaseController {
  constructor(private useCase: UpdateUserAvatarUseCase) { super(); }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // @ts-ignore
    const userId = req.userId;
    const avatarFile = req.file; 

    if (!avatarFile) {
      return this.clientError(res, "Arquivo de imagem obrigatório.");
    }

    try {
      const result = await this.useCase.execute({
        userId,
        avatarFileName: avatarFile.filename 
      });

      if (result.isFailure) {
        return this.clientError(res, result.error as string);
      }

      return this.ok(res, { avatar: result.getValue() });
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}