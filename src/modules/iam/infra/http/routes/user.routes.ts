import express from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middleware/ensureAuthenticated';


import { createUserController } from '../../../useCases/createUser';
import { loginController } from '../../../useCases/login'; 
import { getUserProfileController } from '../../../useCases/getUserProfile';
import { updateUserProfileController } from '../../../useCases/updateUserProfile';
import { deleteAccountController } from '../../../useCases/deleteAccount';
import { searchUsersController } from '../../../useCases/searchUsers';
import { updateNotificationTokenController } from '../../../useCases/updateNotificationToken';
import { updateUserAvatarController } from '../../../useCases/updateUserAvatar'; 

const userRouter = express.Router();
const upload = multer(uploadConfig);


userRouter.post('/signup', (req, res) => createUserController.execute(req, res));
userRouter.post('/login', (req, res) => loginController.execute(req, res));
userRouter.get('/me', ensureAuthenticated, (req, res) => getUserProfileController.execute(req, res));
userRouter.put('/me', ensureAuthenticated, (req, res) => updateUserProfileController.execute(req, res));
userRouter.delete('/me', ensureAuthenticated, (req, res) => deleteAccountController.execute(req, res));
userRouter.get('/search', ensureAuthenticated, (req, res) => searchUsersController.execute(req, res));
userRouter.patch('/notification-token', ensureAuthenticated, (req, res) => updateNotificationTokenController.execute(req, res));


userRouter.patch(
  '/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'), 
  (req, res) => updateUserAvatarController.execute(req, res)
);

export { userRouter };