import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IFriendRequestRepository } from "../../repos/IFriendRequestRepository";
import {AnswerFriendRequestDTO} from "../answerFriendRequest/AnswerFriendRequestDTO"

export class AnswerFriendRequestUseCase implements UseCase<AnswerFriendRequestDTO, Promise<Result<void>>> {
  constructor(private friendRequestRepo: IFriendRequestRepository) {}

  async execute(req: AnswerFriendRequestDTO): Promise<Result<void>> {
    const request = await this.friendRequestRepo.findById(req.requestId);
    
    if (!request) return Result.fail("Solicitação não encontrada.");
    
    
    if (request.receiverId !== req.userId) {
      return Result.fail("Você não tem permissão para responder a esta solicitação.");
    }

    if (request.status !== 'pending') {
      return Result.fail("Esta solicitação já foi respondida.");
    }

    if (req.action === 'accept') {
      request.accept();
      await this.friendRequestRepo.save(request);
    } else {
      
      await this.friendRequestRepo.delete(req.requestId);
    }

    return Result.ok();
  }
}