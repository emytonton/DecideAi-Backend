import express from 'express';
import { createUserController } from '../../../useCases/createUser';
import { loginController } from '../../../useCases/login'; 
import { ensureAuthenticated } from '../../../../../shared/infra/http/middleware/ensureAuthenticated';
import { getUserProfileController } from '../../../useCases/getUserProfile';
import { updateUserProfileController } from '../../../useCases/updateUserProfile';
import { deleteAccountController } from '../../../useCases/deleteAccount';
import { searchUsersController } from '../../../useCases/searchUsers';
import { updateNotificationTokenController } from '../../../useCases/updateNotificationToken';

const userRouter = express.Router();

userRouter.post('/signup', (req, res) => createUserController.execute(req, res));
userRouter.post('/login', (req, res) => loginController.execute(req, res));


userRouter.get('/me', ensureAuthenticated, (req, res) => getUserProfileController.execute(req, res));
userRouter.put('/me', ensureAuthenticated, (req, res) => updateUserProfileController.execute(req, res));
userRouter.delete('/me', ensureAuthenticated, (req, res) => deleteAccountController.execute(req, res));
userRouter.get('/search', ensureAuthenticated, (req, res) => searchUsersController.execute(req, res));


userRouter.patch('/notification-token', ensureAuthenticated, (req, res) => updateNotificationTokenController.execute(req, res));

export { userRouter };