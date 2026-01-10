import express from 'express';
import cors from 'cors'; 


import { userRouter } from '../../../modules/iam/infra/http/routes/user.routes';
import { socialRouter } from '../../../modules/social/infra/http/routes/social.routes';
import { decisionRouter } from '../../../modules/soloDecision/infra/http/routes/decision.routes';
import { customDecisionRouter } from '../../../modules/customDecision/infra/http/routes/custom.routes';
import { groupDecisionRouter } from '../../../modules/groupDecision/infra/http/routes/group.routes';
const app = express();


app.use(express.json()); 
app.use(cors());         


app.use('/api/v1/users', userRouter);
app.use('/api/v1/social', socialRouter);
app.use('/api/v1/decision', decisionRouter);
app.use('/api/v1/custom', customDecisionRouter);
app.use('/api/v1/group', groupDecisionRouter);
app.get('/', (req, res) => {
  res.json({ message: 'Decide Aí API is running 🚀' });
});

export { app };