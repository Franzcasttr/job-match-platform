import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'redis', port: 6379 },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'redis', port: 6379 },
      },
      {
        name: 'JOB_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'redis', port: 6379 },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroserviceClientsModule {}
