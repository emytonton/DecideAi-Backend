"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    async execute(req, res) {
        try {
            await this.executeImpl(req, res);
        }
        catch (err) {
            console.log(`[BaseController]: Uncaught controller error`);
            console.log(err);
            this.fail(res, 'An unexpected error occurred');
        }
    }
    static jsonResponse(res, code, message) {
        return res.status(code).json({ message });
    }
    ok(res, dto) {
        if (!!dto) {
            return res.status(200).json(dto);
        }
        else {
            return res.sendStatus(200);
        }
    }
    created(res) {
        return res.sendStatus(201);
    }
    clientError(res, message) {
        return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
    }
    conflict(res, message) {
        return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
    }
    fail(res, error) {
        console.log(error);
        return res.status(500).json({
            message: error.toString()
        });
    }
}
exports.BaseController = BaseController;
