import jwt from 'jsonwebtoken';
import { User } from '../domain/entities/User';

export class AuthService {
  private secret: string;
  private expires: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'segredo_padrao_inseguro';
    this.expires = '1d'; 
  }

  public signJWT(user: User): string {
    const payload = {
      userId: user.id.toString(),
      email: user.email.value,
      username: user.username
    };

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expires,
    });
  }


}