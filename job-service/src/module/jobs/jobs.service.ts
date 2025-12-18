import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
  private jobs: any[] = [];
  private candidates = new Map<string, any>();
  private matches = [];

  async createJob(data: any) {
    const job = {
      id: Date.now().toString(),
      employerId: data.employerId,
      title: data.title,
      skills: data.skills,
      experience: data.experience,
    };

    this.jobs.push(job);

    this.recalculateMatchesForJob(job);
    return job;
  }

  registerCandidate(candidate: any) {
    this.candidates.set(candidate.id, candidate);
    this.recalculateMatchesForCandidate(candidate);
  }

  async getMatchesForEmployer(employerId: string) {
    const employerJobs = this.jobs
      .filter((job) => job.employerId === employerId)
      .map((job) => job.id);
    return this.matches.filter((match) => employerJobs.includes(match.jobId));
  }

  getMatchesForCandidate(candidateId: string) {
    return this.matches.filter((match) => match.candidateId === candidateId);
  }

  private recalculateMatchesForJob(job: any) {
    this.candidates.forEach((candidate) => {
      const score = this.calculateScore(job, candidate);
      if (score > 0) {
        this.matches.push({
          jobId: job.id,
          candidateId: candidate.id,
          score,
        });
      }
    });
  }

  private recalculateMatchesForCandidate(job: any) {
    this.jobs.forEach((candidate) => {
      const score = this.calculateScore(job, candidate);
      if (score > 0) {
        this.matches.push({
          jobId: job.id,
          candidateId: candidate.id,
          score,
        });
      }
    });
  }

  private calculateScore(job: any, candiate: any): number {
    const matchedSkill = candiate.skills.filter((skill) => {
      return job.skills.includes(skill);
    });

    if (matchedSkill === 0) return 0;

    const skillScore = matchedSkill.length / job.skills.length;
    const experienceScore = Math.min(candiate.experience / job.experience, 1);

    return Number((skillScore * 0.75 + experienceScore * 0.3).toFixed(2));
  }
}
