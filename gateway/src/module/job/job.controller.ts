import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('jobs')
export class JobController {
  constructor(@Inject('JOB_SERVICE') private jobClient: ClientProxy) {}

  @Post()
  createJob(@Body() data: any) {
    return this.jobClient.send('job.create', data);
  }

  @Get('employer/matches')
  getEmployerMatches(@Query('employerId') employerId: string) {
    return this.jobClient.send('job.matches.employer', employerId);
  }

  @Get('candidate/matches')
  getCandidateMatches(@Query('candidateId') candidateId: string) {
    return this.jobClient.send('job.matches.candidate', candidateId);
  }
}
