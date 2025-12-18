import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('jobs')
export class JobController {
  constructor(@Inject('JOB_SERVICE') private jobClient: ClientProxy) {}

  @Post()
  createJob(data: any) {
    return this.jobClient.send('job.create', data);
  }

  @Get('employer/matches')
  getEmployerMatches(employerId: string) {
    return this.jobClient.send('job.matches.employer', employerId);
  }

  @Get('candidate/matches')
  getCandidateMatches(candidateId: string) {
    return this.jobClient.send('job.matches.candidate', candidateId);
  }
}
