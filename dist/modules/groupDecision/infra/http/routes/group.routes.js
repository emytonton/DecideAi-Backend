"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupDecisionRouter = void 0;
const express_1 = __importDefault(require("express"));
const ensureAuthenticated_1 = require("../../../../../shared/infra/http/middleware/ensureAuthenticated");
const useCases_1 = require("../../../useCases");
const groupDecisionRouter = express_1.default.Router();
exports.groupDecisionRouter = groupDecisionRouter;
// Todas as rotas de grupo exigem login
groupDecisionRouter.use(ensureAuthenticated_1.ensureAuthenticated);
// 1. Listar decisões (Inbox/Histórico)
groupDecisionRouter.get('/', (req, res) => useCases_1.getMyDecisionsController.execute(req, res));
// 2. Criar nova decisão em grupo
groupDecisionRouter.post('/', (req, res) => useCases_1.createGroupDecisionController.execute(req, res));
// 3. Responder (Votar ou Recusar)
groupDecisionRouter.post('/answer', (req, res) => useCases_1.answerGroupDecisionController.execute(req, res));
// 4. Marcar resultado como visto (Limpar notificação)
groupDecisionRouter.patch('/viewed', (req, res) => useCases_1.markViewedController.execute(req, res));
groupDecisionRouter.get('/:id', (req, res) => useCases_1.getGroupDecisionByIdController.execute(req, res));
