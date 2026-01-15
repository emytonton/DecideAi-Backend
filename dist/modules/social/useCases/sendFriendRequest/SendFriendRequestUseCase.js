"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendFriendRequestUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
const FriendRequest_1 = require("../../domain/entities/FriendRequest");
class SendFriendRequestUseCase {
    constructor(friendRequestRepo, userRepo) {
        this.friendRequestRepo = friendRequestRepo;
        this.userRepo = userRepo;
    }
    async execute(req) {
        const receiver = await this.userRepo.findById(req.receiverId);
        if (!receiver)
            return Result_1.Result.fail("Usuário não encontrado.");
        const existingRequest = await this.friendRequestRepo.findByUsers(req.senderId, req.receiverId);
        if (existingRequest) {
            if (existingRequest.status === 'pending')
                return Result_1.Result.fail("Já existe uma solicitação pendente.");
            if (existingRequest.status === 'accepted')
                return Result_1.Result.fail("Vocês já são amigos.");
        }
        const requestOrError = FriendRequest_1.FriendRequest.create({
            senderId: req.senderId,
            receiverId: req.receiverId
        });
        if (requestOrError.isFailure)
            return Result_1.Result.fail(requestOrError.error);
        const friendRequest = requestOrError.getValue();
        await this.friendRequestRepo.save(friendRequest);
        return Result_1.Result.ok(friendRequest);
    }
}
exports.SendFriendRequestUseCase = SendFriendRequestUseCase;
