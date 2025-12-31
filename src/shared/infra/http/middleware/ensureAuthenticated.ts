import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token missing' });
  }

  
  const [, token] = authHeader.split(' ');

  try {
    const secret = process.env.JWT_SECRET || 'segredo_padrao_inseguro';
    const decoded = jwt.verify(token, secret) as TokenPayload;

   
    req.userId = decoded.userId;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}