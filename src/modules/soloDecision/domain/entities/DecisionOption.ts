import { Entity } from "../../../../shared/core/Entity";
import { Result } from "../../../../shared/core/Result";

export type DecisionCategory = 'movie' | 'food' | 'drink' | 'exercise' | 'book';

interface DecisionOptionProps {
  title: string;
  category: DecisionCategory;
  primaryFilter: string; 
  secondaryFilter: string; 
  imageUrl?: string;
}

export class DecisionOption extends Entity<DecisionOptionProps> {
  get title(): string { return this.props.title; }
  get category(): DecisionCategory { return this.props.category; }
  get primaryFilter(): string { return this.props.primaryFilter; }
  get secondaryFilter(): string { return this.props.secondaryFilter; }
  get imageUrl(): string | undefined { return this.props.imageUrl; }

  private constructor(props: DecisionOptionProps, id?: string) {
    super(props, id);
  }

  public static create(props: DecisionOptionProps, id?: string): Result<DecisionOption> {
    return Result.ok<DecisionOption>(new DecisionOption(props, id));
  }
}