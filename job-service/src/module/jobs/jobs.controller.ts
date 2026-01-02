import { Controller } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @MessagePattern('job.create')
  createJob(data: any) {
    return this.jobsService.createJob(data);
  }

  @MessagePattern('job.matches.employer')
  getEmployerMatches(employerId: string) {
    return this.jobsService.getMatchesForEmployer(employerId);
  }

  @MessagePattern('job.matches.candidate')
  getCandidateMatches(candidateId: string) {
    return this.jobsService.getMatchesForCandidate(candidateId);
  }

  @EventPattern('user.profile.updated')
  handleProfileUpdate(profile: any) {
    if (profile.role === 'CANDIDATE') {
      return this.jobsService.registerCandidate(profile);
    }

    return { message: 'Not a candidate' };
  }
}
