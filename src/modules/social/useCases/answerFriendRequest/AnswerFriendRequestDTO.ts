export interface AnswerFriendRequestDTO {
  userId: string; 
  requestId: string;
  action: 'accept' | 'decline';
}