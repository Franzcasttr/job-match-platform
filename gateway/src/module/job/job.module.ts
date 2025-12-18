import { Module } from '@nestjs/common';
import { JobController } from './job.controller';

@Module({
  providers: [],
  controllers: [JobController],
})
export class JobModule {}
