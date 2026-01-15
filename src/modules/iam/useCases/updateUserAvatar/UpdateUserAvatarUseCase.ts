import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repos/IUserRepository";
import { S3StorageProvider } from "../../../../shared/infra/providers/implementations/S3StorageProvider";

interface RequestDTO {
  userId: string;
  avatarFileName: string;
}

export class UpdateUserAvatarUseCase implements UseCase<RequestDTO, Promise<Result<string>>> {
  constructor(
    private userRepo: IUserRepository,
    private storageProvider: S3StorageProvider
  ) {}

  async execute({ userId, avatarFileName }: RequestDTO): Promise<Result<string>> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      return Result.fail("Usuário não encontrado.");
    }

   
    if (user.avatar) {
    
      const oldAvatarFile = user.avatar.split("/").pop(); 

      if (oldAvatarFile) {
      
        await this.storageProvider.deleteFile(oldAvatarFile, "avatar");
      }
    }

   
    const avatarUrl = await this.storageProvider.saveFile(avatarFileName, "avatar");

    
    user.updateAvatar(avatarUrl);

   
    await this.userRepo.save(user);

    return Result.ok(avatarUrl);
  }
}