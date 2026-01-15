import { IUserListRepository } from "../IUserListRepository";
import { UserList } from "../../domain/entities/UserList";
import { UserListModel } from "../../infra/database/userList.model";

export class MongooseUserListRepository implements IUserListRepository {
  
  async save(userList: UserList): Promise<void> {
    const raw = {
      _id: userList.id.toString(),
      userId: userList.userId,
      title: userList.title,
      options: userList.options,
      createdAt: userList.createdAt
    };

    await UserListModel.findOneAndUpdate(
      { _id: raw._id },
      raw,
      { upsert: true, new: true }
    );
  }

  async findByUserId(userId: string): Promise<UserList[]> {
    const docs = await UserListModel.find({ userId }).sort({ createdAt: -1 });
    
   
    return docs.map(d => {
      const data = d.toObject();
      return UserList.create({
        userId: data.userId,
        title: data.title,
        options: data.options,
      }, d._id.toString()).getValue();
    });
  }

  async findById(listId: string): Promise<UserList | null> {
    const doc = await UserListModel.findById(listId);
    if (!doc) return null;
    
 
    const data = doc.toObject();
    return UserList.create({
      userId: data.userId,
      title: data.title,
      options: data.options,
    }, doc._id.toString()).getValue();
  }

  async delete(listId: string): Promise<void> {
    await UserListModel.deleteOne({ _id: listId });
  }
}