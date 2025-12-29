import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './module/chat/chat.module';
import { PrismaModule } from './module/prisma/prisma.module';

@Module({
  imports: [ChatModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
