import { Request, Response, NextFunction } from 'express';
import { MongoConnection } from '../../database/mongoose';

export async function ensureDatabaseConnection(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    await MongoConnection.connect();
    return next();
  } catch (err: any) {
    return res.status(500).json({
      message: "Database unavailable",
      error: err.message
    });
  }
}