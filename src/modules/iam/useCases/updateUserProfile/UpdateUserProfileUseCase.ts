import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repos/IUserRepository";
import { UpdateUserProfileDTO } from "./UpdateUserProfileDTO";


interface UpdatedUserResponse {
  id: string;
  username: string;
  email: string;
  avatar: string | null | undefined;
}

export class UpdateUserProfileUseCase implements UseCase<UpdateUserProfileDTO, Promise<Result<UpdatedUserResponse>>> {
  constructor(private userRepo: IUserRepository) {}

  async execute(req: UpdateUserProfileDTO): Promise<Result<UpdatedUserResponse>> {
    const user = await this.userRepo.findById(req.userId);
    if (!user) return Result.fail("Usuário não encontrado.");

    
    if (req.username && req.username !== user.username) {
      const usernameTaken = await this.userRepo.existsByUsername(req.username);
      if (usernameTaken) {
        return Result.fail("Este nome de usuário já está em uso.");
      }
      
      const updateResult = user.updateUsername(req.username);
      if (updateResult.isFailure) return Result.fail(updateResult.error as string);
    }

    if (req.avatar) {
      user.updateAvatar(req.avatar);
    }

    await this.userRepo.save(user);

    
    return Result.ok({
      id: user.id.toString(),
      username: user.username,
      email: user.email.value,
      avatar: user.avatar
    });
  }
}