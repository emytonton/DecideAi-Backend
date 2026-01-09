import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserListRepository } from "../../repos/IUserListRepository";
import { UserList } from "../../domain/entities/UserList";

interface RequestDTO {
  userId: string;
  title: string;
  options: string[];
}

export class CreateUserListUseCase implements UseCase<RequestDTO, Promise<Result<UserList>>> {
  constructor(private repo: IUserListRepository) {}

  async execute(req: RequestDTO): Promise<Result<UserList>> {
    const listOrError = UserList.create({
      userId: req.userId,
      title: req.title,
      options: req.options
    });

    if (listOrError.isFailure) {
      return Result.fail(listOrError.error as string);
    }

    const list = listOrError.getValue();
    await this.repo.save(list);

    return Result.ok(list);
  }
}