"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerFriendRequestUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class AnswerFriendRequestUseCase {
    constructor(friendRequestRepo) {
        this.friendRequestRepo = friendRequestRepo;
    }
    async execute(req) {
        const request = await this.friendRequestRepo.findById(req.requestId);
        if (!request)
            return Result_1.Result.fail("Solicitação não encontrada.");
        if (request.receiverId !== req.userId) {
            return Result_1.Result.fail("Você não tem permissão para responder a esta solicitação.");
        }
        if (request.status !== 'pending') {
            return Result_1.Result.fail("Esta solicitação já foi respondida.");
        }
        if (req.action === 'accept') {
            request.accept();
            await this.friendRequestRepo.save(request);
        }
        else {
            await this.friendRequestRepo.delete(req.requestId);
        }
        return Result_1.Result.ok();
    }
}
exports.AnswerFriendRequestUseCase = AnswerFriendRequestUseCase;
