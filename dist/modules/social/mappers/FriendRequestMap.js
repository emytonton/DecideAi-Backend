"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestMap = void 0;
const FriendRequest_1 = require("../domain/entities/FriendRequest");
class FriendRequestMap {
    static toPersistence(request) {
        return {
            _id: request.id.toString(),
            senderId: request.senderId,
            receiverId: request.receiverId,
            status: request.status,
            createdAt: request.createdAt,
            updatedAt: request.props.updatedAt
        };
    }
    static toDomain(raw) {
        if (!raw)
            return null;
        const requestOrError = FriendRequest_1.FriendRequest.create({
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
exports.FriendRequestMap = FriendRequestMap;
