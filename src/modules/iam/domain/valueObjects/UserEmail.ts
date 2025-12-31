import { ValueObject } from "../../../../shared/core/ValueObject";
import { Result } from "../../../../shared/core/Result";

export interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email: string): Result<UserEmail> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return Result.fail<UserEmail>("Endereço de email inválido.");
    }

    return Result.ok<UserEmail>(new UserEmail({ value: email.toLowerCase() }));
  }
}