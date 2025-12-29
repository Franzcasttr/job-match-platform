import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(message: {
    conversationId: string;
    senderId: string;
    text: string;
  }) {
    const text = await this.prisma.message.create({
      data: {
        conversationId: message.conversationId,
        senderId: message.senderId,
        text: message.text,
      },
    });
    return text;
  }

  async getMessages(conversationId: string) {
    const message = await this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
    return message;
  }
}
