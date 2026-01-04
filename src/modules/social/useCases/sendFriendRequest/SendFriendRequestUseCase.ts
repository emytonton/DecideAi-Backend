import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IFriendRequestRepository } from "../../repos/IFriendRequestRepository";
import { IUserRepository } from "../../../iam/repos/IUserRepository";
import { FriendRequest } from "../../domain/entities/FriendRequest";
import { SendFriendRequestDTO } from "./SendFriendRequestDTO";


export class SendFriendRequestUseCase implements UseCase<SendFriendRequestDTO, Promise<Result<FriendRequest>>> {
  constructor(
    private friendRequestRepo: IFriendRequestRepository,
    private userRepo: IUserRepository
  ) {}

  async execute(req: SendFriendRequestDTO): Promise<Result<FriendRequest>> {
    const receiver = await this.userRepo.findById(req.receiverId);
    if (!receiver) return Result.fail("Usuário não encontrado.");

    const existingRequest = await this.friendRequestRepo.findByUsers(req.senderId, req.receiverId);
    if (existingRequest) {
      if (existingRequest.status === 'pending') return Result.fail("Já existe uma solicitação pendente.");
      if (existingRequest.status === 'accepted') return Result.fail("Vocês já são amigos.");
    }

    const requestOrError = FriendRequest.create({
      senderId: req.senderId,
      receiverId: req.receiverId
    });

    if (requestOrError.isFailure) return Result.fail(requestOrError.error as string);

    const friendRequest = requestOrError.getValue();

  
    await this.friendRequestRepo.save(friendRequest);

    
    return Result.ok<FriendRequest>(friendRequest);
  }
}