import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IFriendRequestRepository } from "../../repos/IFriendRequestRepository";
import { IUserRepository } from "../../../iam/repos/IUserRepository";

interface GetFriendsResponse {
  friends: any[];
  pendingReceived: any[];
}

export class GetFriendsUseCase implements UseCase<string, Promise<Result<GetFriendsResponse>>> {
  constructor(
    private friendRequestRepo: IFriendRequestRepository,
    private userRepo: IUserRepository
  ) {}

  async execute(userId: string): Promise<Result<GetFriendsResponse>> {
    
    const pendingRequests = await this.friendRequestRepo.findPendingByReceiverId(userId);
    
    
    const senderIds = pendingRequests.map(r => r.senderId);
    const senders = await this.userRepo.findAllByIds(senderIds);

    const pendingDTO = pendingRequests.map(req => {
      const sender = senders.find(u => u.id.toString() === req.senderId);
      return {
        requestId: req.id.toString(),
        sender: sender ? {
          id: sender.id.toString(),
          username: sender.username,
          avatar: sender.avatar
        } : null,
        createdAt: req.createdAt
      };
    });

 
    const acceptedRequests = await this.friendRequestRepo.findAcceptedByUserId(userId);
    
    const friendIds = acceptedRequests.map(r => 
      r.senderId === userId ? r.receiverId : r.senderId
    );
    const friends = await this.userRepo.findAllByIds(friendIds);

    const friendsDTO = friends.map(f => ({
      id: f.id.toString(),
      username: f.username,
      email: f.email.value,
      avatar: f.avatar
    }));

    return Result.ok({
      friends: friendsDTO,
      pendingReceived: pendingDTO
    });
  }
}