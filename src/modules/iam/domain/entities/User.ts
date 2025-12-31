import { Entity } from "../../../../shared/core/Entity";
import { Result } from "../../../../shared/core/Result";
import { UserEmail } from "../valueObjects/UserEmail";
import { UserPassword } from "../valueObjects/UserPassword";

interface UserProps {
  username: string;
  email: UserEmail;
  password: UserPassword;
  avatar?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null; 
}

export class User extends Entity<UserProps> {
  
  get username(): string { return this.props.username; }
  get email(): UserEmail { return this.props.email; }
  get password(): UserPassword { return this.props.password; }
  get avatar(): string | undefined { return this.props.avatar; }
  get createdAt(): Date { return this.props.createdAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
  get isDeleted(): boolean { return !!this.props.deletedAt; }

  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(props: { username: string; email: UserEmail; password: UserPassword; avatar?: string }, id?: string): Result<User> {
    if (!props.username || props.username.length < 3) {
      return Result.fail<User>("O nome de usuário deve ter pelo menos 3 caracteres.");
    }
    const user = new User({ ...props, createdAt: new Date(), deletedAt: null }, id);
    return Result.ok<User>(user);
  }

  
  public delete(): void {
    this.props.deletedAt = new Date();
  }

  public updateAvatar(avatar: string): void {
    this.props.avatar = avatar;
    this.props.updatedAt = new Date();
  }

  public updateUsername(username: string): Result<void> {
    if (username.length < 3) return Result.fail("Username muito curto.");
    this.props.username = username;
    this.props.updatedAt = new Date();
    return Result.ok();
  }
}