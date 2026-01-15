"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseFriendRequestRepository = void 0;
const friendRequest_model_1 = require("../../infra/database/friendRequest.model");
const FriendRequestMap_1 = require("../../mappers/FriendRequestMap");
class MongooseFriendRequestRepository {
    async save(request) {
        const raw = FriendRequestMap_1.FriendRequestMap.toPersistence(request);
        await friendRequest_model_1.FriendRequestModel.findOneAndUpdate({ _id: raw._id }, raw, { upsert: true, new: true });
    }
    async findById(id) {
        const raw = await friendRequest_model_1.FriendRequestModel.findById(id);
        return FriendRequestMap_1.FriendRequestMap.toDomain(raw);
    }
    async findByUsers(userA, userB) {
        const raw = await friendRequest_model_1.FriendRequestModel.findOne({
            $or: [
                { senderId: userA, receiverId: userB },
                { senderId: userB, receiverId: userA }
            ]
        });
        return FriendRequestMap_1.FriendRequestMap.toDomain(raw);
    }
    async findPendingByReceiverId(receiverId) {
        const raws = await friendRequest_model_1.FriendRequestModel.find({
            receiverId,
            status: 'pending'
        });
        return raws.map(r => FriendRequestMap_1.FriendRequestMap.toDomain(r));
    }
    async findAcceptedByUserId(userId) {
        const raws = await friendRequest_model_1.FriendRequestModel.find({
            status: 'accepted',
            $or: [{ senderId: userId }, { receiverId: userId }]
        });
        return raws.map(r => FriendRequestMap_1.FriendRequestMap.toDomain(r));
    }
    async delete(requestId) {
        await friendRequest_model_1.FriendRequestModel.deleteOne({ _id: requestId });
    }
}
exports.MongooseFriendRequestRepository = MongooseFriendRequestRepository;
