import express from 'express';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middleware/ensureAuthenticated';
import { 
  sendFriendRequestController, 
  answerFriendRequestController,
  getFriendsController,
  removeFriendController 
} from '../../../useCases';

const socialRouter = express.Router();
socialRouter.get('/ping', (req, res) => {
  return res.json({ message: 'Social Router is working!' });
});

socialRouter.use(ensureAuthenticated);


socialRouter.get('/friends', (req, res) => getFriendsController.execute(req, res));


socialRouter.post('/friends/request', (req, res) => sendFriendRequestController.execute(req, res));


socialRouter.post('/friends/response', (req, res) => answerFriendRequestController.execute(req, res));


socialRouter.delete('/friends', (req, res) => removeFriendController.execute(req, res));

export { socialRouter };