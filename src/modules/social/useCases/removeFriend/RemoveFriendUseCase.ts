import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IFriendRequestRepository } from "../../repos/IFriendRequestRepository";

interface RemoveFriendDTO {
  userId: string;
  friendId: string;
}

export class RemoveFriendUseCase implements UseCase<RemoveFriendDTO, Promise<Result<void>>> {
  constructor(private friendRequestRepo: IFriendRequestRepository) {}

  async execute(req: RemoveFriendDTO): Promise<Result<void>> {
    const request = await this.friendRequestRepo.findByUsers(req.userId, req.friendId);

    if (!request) {
      return Result.fail("Vínculo de amizade não encontrado.");
    }


    await this.friendRequestRepo.delete(request.id.toString());
    
    return Result.ok();
  }
}