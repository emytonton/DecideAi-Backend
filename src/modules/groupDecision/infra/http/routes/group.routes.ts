import express from 'express';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middleware/ensureAuthenticated';
import { 
  createGroupDecisionController,
  answerGroupDecisionController,
  getMyDecisionsController,
  markViewedController
} from '../../../useCases';

const groupDecisionRouter = express.Router();

// Todas as rotas de grupo exigem login
groupDecisionRouter.use(ensureAuthenticated);

// 1. Listar decisões (Inbox/Histórico)
groupDecisionRouter.get('/', (req, res) => getMyDecisionsController.execute(req, res));

// 2. Criar nova decisão em grupo
groupDecisionRouter.post('/', (req, res) => createGroupDecisionController.execute(req, res));

// 3. Responder (Votar ou Recusar)
groupDecisionRouter.post('/answer', (req, res) => answerGroupDecisionController.execute(req, res));

// 4. Marcar resultado como visto (Limpar notificação)
groupDecisionRouter.patch('/viewed', (req, res) => markViewedController.execute(req, res));

export { groupDecisionRouter };