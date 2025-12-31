import { ValueObject } from "../../../../shared/core/ValueObject";
import { Result } from "../../../../shared/core/Result";
import bcrypt from 'bcryptjs';

export interface UserPasswordProps {
  value: string;
  isHashed: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  
  get value(): string {
    return this.props.value;
  }
  
  get isHashed(): boolean {
    return this.props.isHashed;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    if (this.isHashed) {
      return bcrypt.compare(plainTextPassword, this.value);
    }
    return this.value === plainTextPassword;
  }

  public async getHashedValue(): Promise<string> {
    if (this.isHashed) {
      return this.value;
    }
    return bcrypt.hash(this.value, 10);
  }

  public static create(password: string): Result<UserPassword> {
    if (password === null || password === undefined || password.length < 6) {
      return Result.fail<UserPassword>("A senha deve ter pelo menos 6 caracteres.");
    }

    return Result.ok<UserPassword>(new UserPassword({ value: password, isHashed: false }));
  }

  public static createFromHash(hashedPassword: string): Result<UserPassword> {
  
    return Result.ok<UserPassword>(new UserPassword({ value: hashedPassword, isHashed: true }));
  }
}