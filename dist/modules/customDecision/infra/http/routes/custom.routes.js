"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customDecisionRouter = void 0;
const express_1 = __importDefault(require("express"));
const ensureAuthenticated_1 = require("../../../../../shared/infra/http/middleware/ensureAuthenticated");
const useCases_1 = require("../../../useCases");
const customDecisionRouter = express_1.default.Router();
exports.customDecisionRouter = customDecisionRouter;
customDecisionRouter.use(ensureAuthenticated_1.ensureAuthenticated);
customDecisionRouter.get('/lists', (req, res) => useCases_1.getUserListsController.execute(req, res));
customDecisionRouter.post('/lists', (req, res) => useCases_1.createUserListController.execute(req, res));
customDecisionRouter.delete('/lists/:id', (req, res) => useCases_1.deleteUserListController.execute(req, res));
customDecisionRouter.post('/decide', (req, res) => useCases_1.pickRandomOptionController.execute(req, res));
customDecisionRouter.put('/lists/:id', (req, res) => useCases_1.updateUserListController.execute(req, res));
