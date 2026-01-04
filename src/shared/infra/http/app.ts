import express from 'express';
import cors from 'cors'; 


import { userRouter } from '../../../modules/iam/infra/http/routes/user.routes';
import { socialRouter } from '../../../modules/social/infra/http/routes/social.routes';



const app = express();


app.use(express.json()); 
app.use(cors());         


app.use('/api/v1/users', userRouter);
app.use('/api/v1/social', socialRouter);
app.get('/', (req, res) => {
  res.json({ message: 'Decide Aí API is running 🚀' });
});

export { app };