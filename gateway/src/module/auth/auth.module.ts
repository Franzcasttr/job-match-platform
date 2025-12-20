import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MicroserviceClientsModule } from 'src/microservice-client.module';

@Module({
  imports: [MicroserviceClientsModule],
  controllers: [AuthController],
})
export class AuthModule {}
