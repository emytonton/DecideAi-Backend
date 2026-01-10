import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repos/IUserRepository";

interface RequestDTO {
  userId: string;
  token: string;
}

export class UpdateNotificationTokenUseCase implements UseCase<RequestDTO, Promise<Result<void>>> {
  constructor(private userRepo: IUserRepository) {}

  async execute(req: RequestDTO): Promise<Result<void>> {
    const user = await this.userRepo.findById(req.userId);
    
    if (!user) {
      return Result.fail("Usuário não encontrado.");
    }

    
    user.notificationToken = req.token;
    
    await this.userRepo.save(user);
    
    return Result.ok();
  }
}