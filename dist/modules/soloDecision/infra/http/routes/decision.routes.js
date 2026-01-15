"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decisionRouter = void 0;
const express_1 = __importDefault(require("express"));
const ensureAuthenticated_1 = require("../../../../../shared/infra/http/middleware/ensureAuthenticated");
const useCases_1 = require("../../../useCases");
const index_1 = require("../../../repos/index");
const SeedDecisionUseCase_1 = require("../../../useCases/seedDatabase/SeedDecisionUseCase");
const decisionRouter = express_1.default.Router();
exports.decisionRouter = decisionRouter;
decisionRouter.post('/seed', async (req, res) => {
    const seedUseCase = new SeedDecisionUseCase_1.SeedDecisionUseCase(index_1.decisionRepo);
    await seedUseCase.execute();
    return res.json({ message: "Banco populado com sucesso!" });
});
decisionRouter.use(ensureAuthenticated_1.ensureAuthenticated);
decisionRouter.post('/solo', (req, res) => useCases_1.makeSoloDecisionController.execute(req, res));
