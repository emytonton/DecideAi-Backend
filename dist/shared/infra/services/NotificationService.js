"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const axios_1 = __importDefault(require("axios"));
class NotificationService {
    static async send(messages) {
        const validMessages = messages.filter(msg => msg.to && msg.to.startsWith('ExponentPushToken'));
        if (validMessages.length === 0)
            return;
        try {
            await axios_1.default.post('https://exp.host/--/api/v2/push/send', validMessages, {
                headers: {
                    'Accept': 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
            });
            console.log(`🔔 Notificações enviadas para ${validMessages.length} usuários.`);
        }
        catch (error) {
            console.error("Erro ao enviar notificações push:", error);
        }
    }
}
exports.NotificationService = NotificationService;
