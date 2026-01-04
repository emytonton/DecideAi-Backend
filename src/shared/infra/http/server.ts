import 'dotenv/config'; 
import mongoose from 'mongoose';
import { app } from './app';

const PORT = process.env.PORT || 3333;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/decideai';


mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('📦 Database connected successfully!');
    
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to database:', err);
    process.exit(1); 
  });