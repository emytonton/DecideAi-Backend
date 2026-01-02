import { IFriendRequestRepository } from "../IFriendRequestRepository";
import { FriendRequest } from "../../domain/entities/FriendRequest";
import { FriendRequestModel } from "../../infra/database/friendRequest.model";
import { FriendRequestMap } from "../../mappers/FriendRequestMap";

export class MongooseFriendRequestRepository implements IFriendRequestRepository {
  
  async save(request: FriendRequest): Promise<void> {
    const raw = FriendRequestMap.toPersistence(request);
    await FriendRequestModel.findOneAndUpdate(
      { _id: raw._id },
      raw,
      { upsert: true, new: true }
    );
  }

  async findById(id: string): Promise<FriendRequest | null> {
    const raw = await FriendRequestModel.findById(id);
    return FriendRequestMap.toDomain(raw);
  }

  async findByUsers(userA: string, userB: string): Promise<FriendRequest | null> {
    
    const raw = await FriendRequestModel.findOne({
      $or: [
        { senderId: userA, receiverId: userB },
        { senderId: userB, receiverId: userA }
      ]
    });
    return FriendRequestMap.toDomain(raw);
  }

  async findPendingByReceiverId(receiverId: string): Promise<FriendRequest[]> {
    const raws = await FriendRequestModel.find({ 
      receiverId, 
      status: 'pending' 
    });
    return raws.map(r => FriendRequestMap.toDomain(r) as FriendRequest);
  }

  async findAcceptedByUserId(userId: string): Promise<FriendRequest[]> {
    
    const raws = await FriendRequestModel.find({
      status: 'accepted',
      $or: [{ senderId: userId }, { receiverId: userId }]
    });
    return raws.map(r => FriendRequestMap.toDomain(r) as FriendRequest);
  }

  async delete(requestId: string): Promise<void> {
    await FriendRequestModel.deleteOne({ _id: requestId });
  }
}