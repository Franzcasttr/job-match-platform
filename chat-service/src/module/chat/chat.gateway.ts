import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { pub, sub } from 'src/lib/redis.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUser = new Map<string, string>();

  constructor(private chatService: ChatService) {
    sub.subscribe('chat', (_, message) => {
      const data = JSON.parse(message as string);
      this.server.to(data.conversationId).emit('message', data);
    });
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    this.onlineUser.set(userId, client.id);
  }
  handleDisconnect(client: Socket) {
    [...this.onlineUser.entries()].forEach(([userId, socketId]) => {
      if (socketId === client.id) {
        this.onlineUser.delete(userId);
      }
    });
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, @MessageBody() conversationId: string) {
    client.join(conversationId);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody()
    payload: {
      conversationId: string;
      senderId: string;
      text: string;
    },
  ) {
    const message = {
      conversationId: payload.conversationId,
      senderId: payload.senderId,
      text: payload.text,
      timestamp: new Date().toISOString(),
    };
    this.chatService.saveMessage(message);
    pub.publish('chat', JSON.stringify(message));
  }
}
