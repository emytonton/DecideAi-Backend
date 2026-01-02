import { FriendRequest } from "../domain/entities/FriendRequest";

export class FriendRequestMap {
  public static toPersistence(request: FriendRequest): any {
    return {
      _id: request.id.toString(),
      senderId: request.senderId,
      receiverId: request.receiverId,
      status: request.status,
      createdAt: request.createdAt,
      updatedAt: request.props.updatedAt
    };
  }

  public static toDomain(raw: any): FriendRequest | null {
    if (!raw) return null;

    const requestOrError = FriendRequest.create({
      senderId: raw.senderId,
      receiverId: raw.receiverId
    }, raw._id);

    if (requestOrError.isSuccess) {
      const request = requestOrError.getValue();
      // @ts-ignore
      request.props.status = raw.status;
      // @ts-ignore
      request.props.createdAt = raw.createdAt;
      return request;
    }
    return null;
  }
}