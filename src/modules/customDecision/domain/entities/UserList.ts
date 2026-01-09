import { Entity } from "../../../../shared/core/Entity";
import { Result } from "../../../../shared/core/Result";

interface UserListProps {
  userId: string;
  title: string;
  options: string[]; 
  createdAt: Date;
}

export class UserList extends Entity<UserListProps> {
  get userId(): string { return this.props.userId; }
  get title(): string { return this.props.title; }
  get options(): string[] { return this.props.options; }
  get createdAt(): Date { return this.props.createdAt; }

  private constructor(props: UserListProps, id?: string) {
    super(props, id);
  }

  public static create(props: { userId: string; title: string; options: string[] }, id?: string): Result<UserList> {
    if (props.options.length < 2) {
      return Result.fail("A lista precisa ter pelo menos 2 opções para sortear.");
    }
    if (!props.title || props.title.trim().length === 0) {
      return Result.fail("O título da lista é obrigatório.");
    }

    return Result.ok<UserList>(new UserList({
      ...props,
      createdAt: new Date()
    }, id));
  }

  public update(title: string, options: string[]): Result<void> {
    if (options.length < 2) {
      return Result.fail("A lista precisa ter pelo menos 2 opções.");
    }
    if (!title || title.trim().length === 0) {
      return Result.fail("O título da lista é obrigatório.");
    }

    this.props.title = title;
    this.props.options = options;
    
    return Result.ok();
  }
  
}