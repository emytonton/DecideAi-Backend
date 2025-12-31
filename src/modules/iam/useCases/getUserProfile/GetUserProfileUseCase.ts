import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repos/IUserRepository";
import { User } from "../../domain/entities/User";


interface UserProfileDTO {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export class GetUserProfileUseCase implements UseCase<string, Promise<Result<UserProfileDTO>>> {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string): Promise<Result<UserProfileDTO>> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      return Result.fail("Usuário não encontrado.");
    }

    return Result.ok({
      id: user.id.toString(),
      username: user.username,
      email: user.email.value,
      avatar: user.avatar,
      createdAt: user.createdAt
    });
  }
}