"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFriendUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class RemoveFriendUseCase {
    constructor(friendRequestRepo) {
        this.friendRequestRepo = friendRequestRepo;
    }
    async execute(req) {
        const request = await this.friendRequestRepo.findByUsers(req.userId, req.friendId);
        if (!request) {
            return Result_1.Result.fail("Vínculo de amizade não encontrado.");
        }
        await this.friendRequestRepo.delete(request.id.toString());
        return Result_1.Result.ok();
    }
}
exports.RemoveFriendUseCase = RemoveFriendUseCase;
