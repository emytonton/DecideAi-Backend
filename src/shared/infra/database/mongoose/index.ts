import mongoose from 'mongoose';

export class MongoConnection {
  private static databaseUrl = process.env.DATABASE_URL || process.env.MONGO_URL || 'mongodb://localhost:27017/decideai';

  public static async connect(): Promise<void> {
   
    if (mongoose.connection.readyState >= 1) return;

    try {
      await mongoose.connect(this.databaseUrl, {
        bufferCommands: false, 
        serverSelectionTimeoutMS: 5000,
      });
      console.log('📦 MongoDB: Connection established.');
    } catch (err: any) {
      console.error('❌ MongoDB: Connection failed:', err.message);
      throw err;
    }
  }

  public static async disconnect(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}