import { User } from "../domain/entities/User";
import { UserEmail } from "../domain/valueObjects/UserEmail";
import { UserPassword } from "../domain/valueObjects/UserPassword";

export class UserMap {
  
  
  public static async toPersistence(user: User): Promise<any> {
    const passwordHash = await user.password.getHashedValue();
    
    return {
      _id: user.id.toString(),
      username: user.username,
      email: user.email.value,
      password: passwordHash,
      avatar: user.avatar,
      createdAt: user.createdAt
    };
  }

  
  public static toDomain(raw: any): User | null {
    if (!raw) return null;

    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.createFromHash(raw.password);

    if (userEmailOrError.isFailure || userPasswordOrError.isFailure) {
      console.error("Erro ao converter usuário do banco para domínio:", raw);
      return null;
    }

    const userOrError = User.create({
      username: raw.username,
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      avatar: raw.avatar
    }, raw._id);

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }
}