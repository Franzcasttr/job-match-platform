import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  message = [];

  saveMessage(message: any) {
    this.message.push(message);
    return message;
  }

  getMessages(conversationId: string) {
    return this.message.filter(
      (message) => message.conversationId === conversationId,
    );
  }
}
