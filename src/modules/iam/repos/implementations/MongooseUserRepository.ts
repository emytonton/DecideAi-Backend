import { IUserRepository } from "../IUserRepository";
import { User } from "../../domain/entities/User";
import { UserMap } from "../../mappers/UserMap";
import { UserModel } from "../../infra/database/user.model";

export class MongooseUserRepository implements IUserRepository {
  

  async findById(id: string): Promise<User | null> {
    const rawUser = await UserModel.findOne({ _id: id, deletedAt: null });
    return UserMap.toDomain(rawUser);
  }
 
  async exists(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });
    return !!user;
  }

  async existsByUsername(username: string): Promise<boolean> {
    const user = await UserModel.findOne({ username });
    return !!user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const rawUser = await UserModel.findOne({ email });
    return UserMap.toDomain(rawUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    const rawUser = await UserModel.findOne({ username });
    return UserMap.toDomain(rawUser);
  }

  async save(user: User): Promise<void> {
    const rawUser = await UserMap.toPersistence(user);
    
    await UserModel.findOneAndUpdate(
      { _id: rawUser._id },
      rawUser,
      { upsert: true, new: true }
    );
  }

  async searchByUsername(query: string): Promise<User[]> {
    const users = await UserModel.find({
      username: { $regex: query, $options: 'i' }, 
      deletedAt: null 
    }).limit(20); 

    return users.map(user => UserMap.toDomain(user) as User);
  }
}