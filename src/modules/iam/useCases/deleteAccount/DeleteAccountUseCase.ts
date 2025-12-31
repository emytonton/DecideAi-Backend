import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repos/IUserRepository";

export class DeleteAccountUseCase implements UseCase<string, Promise<Result<void>>> {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string): Promise<Result<void>> {
    const user = await this.userRepo.findById(userId);
    if (!user) return Result.fail("Usuário não encontrado.");

    user.delete(); 
    await this.userRepo.save(user); 

    return Result.ok();
  }
}