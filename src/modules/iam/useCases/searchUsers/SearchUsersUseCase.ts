import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repos/IUserRepository";

export class SearchUsersUseCase implements UseCase<string, Promise<Result<any[]>>> {
  constructor(private userRepo: IUserRepository) {}

  async execute(query: string): Promise<Result<any[]>> {
    if (!query || query.length < 1) return Result.ok([]); 

    const users = await this.userRepo.searchByUsername(query);

    const usersDTO = users.map(u => ({
      id: u.id.toString(),
      username: u.username,
      email: u.email.value, 
      avatar: u.avatar || null,
      createdAt: u.createdAt 
    }));

    return Result.ok(usersDTO);
  }
}