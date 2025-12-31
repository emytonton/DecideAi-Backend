import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { userRouter } from '../../modules/iam/infra/http/routes/user.routes'; 

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Decide Aí API is running 🚀' });
});

export { app };