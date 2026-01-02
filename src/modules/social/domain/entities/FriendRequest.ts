import { Entity } from "../../../../shared/core/Entity";
import { Result } from "../../../../shared/core/Result";

export type FriendRequestStatus = 'pending' | 'accepted' | 'declined';

interface FriendRequestProps {
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export class FriendRequest extends Entity<FriendRequestProps> {
  
  get senderId(): string { return this.props.senderId; }
  get receiverId(): string { return this.props.receiverId; }
  get status(): FriendRequestStatus { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }

  private constructor(props: FriendRequestProps, id?: string) {
    super(props, id);
  }

  public static create(props: { senderId: string; receiverId: string }, id?: string): Result<FriendRequest> {
    if (props.senderId === props.receiverId) {
      return Result.fail("Você não pode enviar um convite para si mesmo.");
    }

    const request = new FriendRequest({
      ...props,
      status: 'pending', 
      createdAt: new Date()
    }, id);

    return Result.ok<FriendRequest>(request);
  }

  
  public accept(): void {
    this.props.status = 'accepted';
    this.props.updatedAt = new Date();
  }

  public decline(): void {
    this.props.status = 'declined';
    this.props.updatedAt = new Date();
  }
}