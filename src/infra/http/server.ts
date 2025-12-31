import 'dotenv/config';
import { app } from './app';
import { connectDB } from '../database';

const PORT = process.env.PORT || 3333;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

start();