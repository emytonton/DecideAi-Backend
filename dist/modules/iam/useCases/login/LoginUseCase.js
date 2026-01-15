"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class LoginUseCase {
    constructor(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    async execute(request) {
        const { email, password } = request;
        try {
            const user = await this.userRepo.findByEmail(email);
            if (!user) {
                return Result_1.Result.fail("Credenciais inválidas.");
            }
            if (user.isDeleted) {
                return Result_1.Result.fail("Esta conta foi excluída.");
            }
            const passwordValid = await user.password.comparePassword(password);
            if (!passwordValid) {
                return Result_1.Result.fail("Credenciais inválidas.");
            }
            const accessToken = this.authService.signJWT(user);
            return Result_1.Result.ok({
                accessToken,
                user: {
                    username: user.username,
                    email: user.email.value
                }
            });
        }
        catch (err) {
            return Result_1.Result.fail(err);
        }
    }
}
exports.LoginUseCase = LoginUseCase;
