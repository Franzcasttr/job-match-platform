import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MicroserviceClientsModule } from 'src/microservice-client.module';

@Module({
  imports: [MicroserviceClientsModule],
  controllers: [UserController],
})
export class UserModule {}
