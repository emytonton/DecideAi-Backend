import express from 'express';
import { createUserController } from '../../../useCases/createUser';
import { loginController } from '../../../useCases/login'; 
import { ensureAuthenticated } from '../../../../../shared/infra/http/middleware/ensureAuthenticated';
import { getUserProfileController } from '../../../useCases/getUserProfile';


const userRouter = express.Router();

userRouter.post('/signup', (req, res) => createUserController.execute(req, res));
userRouter.post('/login', (req, res) => loginController.execute(req, res));
userRouter.get('/me', ensureAuthenticated, (req, res) => getUserProfileController.execute(req, res));
export { userRouter };