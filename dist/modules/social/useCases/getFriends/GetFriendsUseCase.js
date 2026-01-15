"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFriendsUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class GetFriendsUseCase {
    constructor(friendRequestRepo, userRepo) {
        this.friendRequestRepo = friendRequestRepo;
        this.userRepo = userRepo;
    }
    async execute(userId) {
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
        const friendIds = acceptedRequests.map(r => r.senderId === userId ? r.receiverId : r.senderId);
        const friends = await this.userRepo.findAllByIds(friendIds);
        const friendsDTO = friends.map(f => ({
            id: f.id.toString(),
            username: f.username,
            email: f.email.value,
            avatar: f.avatar
        }));
        return Result_1.Result.ok({
            friends: friendsDTO,
            pendingReceived: pendingDTO
        });
    }
}
exports.GetFriendsUseCase = GetFriendsUseCase;
