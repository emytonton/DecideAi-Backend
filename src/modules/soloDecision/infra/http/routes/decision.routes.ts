import express from 'express';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middleware/ensureAuthenticated';
import { makeSoloDecisionController } from '../../../useCases';
import { decisionRepo } from '../../../repos/index';
import { SeedDecisionUseCase } from '../../../useCases/seedDatabase/SeedDecisionUseCase';


const decisionRouter = express.Router();


decisionRouter.post('/seed', async (req, res) => {
  const seedUseCase = new SeedDecisionUseCase(decisionRepo);
  await seedUseCase.execute();
  return res.json({ message: "Banco populado com sucesso!" });
});


decisionRouter.use(ensureAuthenticated);


decisionRouter.post('/solo', (req, res) => makeSoloDecisionController.execute(req, res));

export { decisionRouter };