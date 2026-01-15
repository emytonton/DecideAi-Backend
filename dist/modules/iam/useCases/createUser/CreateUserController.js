"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class CreateUserController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const dto = req.body;
        try {
            const result = await this.useCase.execute(dto);
            if (result.isFailure) {
                const errorValue = result.error;
                const errorMessage = typeof errorValue === 'string'
                    ? errorValue
                    : errorValue?.message || String(errorValue);
                if (errorMessage.includes('já está em uso') || errorMessage.includes('duplicate')) {
                    return this.conflict(res, errorMessage);
                }
                return this.clientError(res, errorMessage);
            }
            else {
                const userCreated = result.getValue();
                return res.status(201).json(userCreated);
            }
        }
        catch (err) {
            console.log(err);
            return this.fail(res, err.message || String(err));
        }
    }
}
exports.CreateUserController = CreateUserController;
