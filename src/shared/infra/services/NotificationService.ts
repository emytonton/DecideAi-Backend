import axios from 'axios';

export interface IPushMessage {
  to: string; 
  title: string;
  body: string;
  data?: any; 
}

export class NotificationService {

  static async send(messages: IPushMessage[]) {

    const validMessages = messages.filter(msg => msg.to && msg.to.startsWith('ExponentPushToken'));

    if (validMessages.length === 0) return;

    try {
     
      await axios.post('https://exp.host/--/api/v2/push/send', validMessages, {
        headers: {
          'Accept': 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
      });
      console.log(`🔔 Notificações enviadas para ${validMessages.length} usuários.`);
    } catch (error) {
      console.error("Erro ao enviar notificações push:", error);
    }
  }
}