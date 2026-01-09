import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserListRepository } from "../../repos/IUserListRepository";

interface RequestDTO {
  userId: string;
  listId: string;
  title: string;
  options: string[];
}

export class UpdateUserListUseCase implements UseCase<RequestDTO, Promise<Result<void>>> {
  constructor(private repo: IUserListRepository) {}

  async execute(req: RequestDTO): Promise<Result<void>> {
   
    const list = await this.repo.findById(req.listId);

    if (!list) {
      return Result.fail("Lista não encontrada.");
    }

   
    if (list.userId !== req.userId) {
      return Result.fail("Você não tem permissão para editar esta lista.");
    }

    
    const updateResult = list.update(req.title, req.options);
    if (updateResult.isFailure) {
      return Result.fail(updateResult.error as string);
    }

    
    await this.repo.save(list);

    return Result.ok();
  }
}