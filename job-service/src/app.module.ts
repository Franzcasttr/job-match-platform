import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './module/jobs/jobs.module';

@Module({
  imports: [JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
