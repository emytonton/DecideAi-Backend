"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAvatarController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class UpdateUserAvatarController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const avatarFile = req.file;
        if (!avatarFile) {
            return this.clientError(res, "Arquivo de imagem obrigatório.");
        }
        try {
            const result = await this.useCase.execute({
                userId,
                avatarFileName: avatarFile.filename
            });
            if (result.isFailure) {
                return this.clientError(res, result.error);
            }
            return this.ok(res, { avatar: result.getValue() });
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.UpdateUserAvatarController = UpdateUserAvatarController;
