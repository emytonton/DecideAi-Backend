import express from 'express';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middleware/ensureAuthenticated'
import { 
  createUserListController,
  getUserListsController,
  deleteUserListController,
  pickRandomOptionController,
  updateUserListController
} from '../../../useCases';

const customDecisionRouter = express.Router();

customDecisionRouter.use(ensureAuthenticated);


customDecisionRouter.get('/lists', (req, res) => getUserListsController.execute(req, res));


customDecisionRouter.post('/lists', (req, res) => createUserListController.execute(req, res));


customDecisionRouter.delete('/lists/:id', (req, res) => deleteUserListController.execute(req, res));


customDecisionRouter.post('/decide', (req, res) => pickRandomOptionController.execute(req, res));


customDecisionRouter.put('/lists/:id', (req, res) => updateUserListController.execute(req, res));

export { customDecisionRouter };