"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAvatarUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class UpdateUserAvatarUseCase {
    constructor(userRepo, storageProvider) {
        this.userRepo = userRepo;
        this.storageProvider = storageProvider;
    }
    async execute({ userId, avatarFileName }) {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            return Result_1.Result.fail("Usuário não encontrado.");
        }
        if (user.avatar) {
            const oldAvatarFile = user.avatar.split("/").pop();
            if (oldAvatarFile) {
                await this.storageProvider.deleteFile(oldAvatarFile, "avatar");
            }
        }
        const avatarUrl = await this.storageProvider.saveFile(avatarFileName, "avatar");
        user.updateAvatar(avatarUrl);
        await this.userRepo.save(user);
        return Result_1.Result.ok(avatarUrl);
    }
}
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;
