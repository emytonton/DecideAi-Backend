import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserListRepository } from "../../repos/IUserListRepository";

export class GetUserListsUseCase implements UseCase<string, Promise<Result<any[]>>> {
  constructor(private repo: IUserListRepository) {}

  async execute(userId: string): Promise<Result<any[]>> {
    const lists = await this.repo.findByUserId(userId);
    
    
    const data = lists.map(l => ({
      id: l.id.toString(),
      title: l.title,
      options: l.options,
      createdAt: l.createdAt
    }));

    return Result.ok(data);
  }
}