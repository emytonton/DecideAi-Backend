export interface SendFriendRequestDTO {
  senderId: string;   // quem envia (vem do token)
  receiverId: string; // quem recebe (vem do body)
}