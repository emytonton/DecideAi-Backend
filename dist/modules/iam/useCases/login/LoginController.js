"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class LoginController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const dto = req.body;
        try {
            const result = await this.useCase.execute(dto);
            if (result.isFailure) {
                return this.clientError(res, result.error);
            }
            else {
                const loginData = result.getValue();
                return this.ok(res, loginData);
            }
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.LoginController = LoginController;
