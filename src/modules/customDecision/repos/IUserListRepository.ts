import { UserList } from "../domain/entities/UserList";

export interface IUserListRepository {
  save(userList: UserList): Promise<void>;
  findByUserId(userId: string): Promise<UserList[]>;
  findById(listId: string): Promise<UserList | null>;
  delete(listId: string): Promise<void>;
}