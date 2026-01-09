import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserListRepository } from "../../repos/IUserListRepository";

interface RequestDTO {
  listId: string;
}

export class DeleteUserListUseCase implements UseCase<RequestDTO, Promise<Result<void>>> {
  constructor(private repo: IUserListRepository) {}

  async execute(req: RequestDTO): Promise<Result<void>> {
    await this.repo.delete(req.listId);
    return Result.ok();
  }
}