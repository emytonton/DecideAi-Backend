import { FriendRequest } from "../domain/entities/FriendRequest";

export interface IFriendRequestRepository {
  save(request: FriendRequest): Promise<void>;
  
  
  findByUsers(userA: string, userB: string): Promise<FriendRequest | null>;
  
  
  findById(id: string): Promise<FriendRequest | null>;

 
  findPendingByReceiverId(receiverId: string): Promise<FriendRequest[]>;

  
  findAcceptedByUserId(userId: string): Promise<FriendRequest[]>;
  
 
  delete(requestId: string): Promise<void>;
}