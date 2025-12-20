import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { MicroserviceClientsModule } from 'src/microservice-client.module';

@Module({
  imports: [MicroserviceClientsModule],
  controllers: [JobController],
})
export class JobModule {}
