import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async createJob(data: any) {
    const job = await this.prisma.job.create({
      data: {
        employerId: data.employerId,
        title: data.title,
        skills: data.skills,
        experience: data.experience,
      },
    });

    this.recalculateMatchesForJob(job);
    return job;
  }

  async registerCandidate(candidate: any) {
    await this.prisma.candidate.upsert({
      where: { id: candidate.id },
      update: {
        skills: candidate.skills,
        experience: candidate.experience,
      },
      create: {
        id: candidate.id,
        skills: candidate.skills,
        experience: candidate.experience,
      },
    });
    this.recalculateMatchesForCandidate(candidate);
  }

  async getMatchesForEmployer(employerId: string) {
    return this.prisma.match.findMany({
      where: {
        job: { employerId },
      },
      include: {
        job: true,
        candidate: true,
      },
      orderBy: { score: 'desc' },
    });
  }

  async getMatchesForCandidate(candidateId: string) {
    const matches = await this.prisma.match.findMany({
      where: {
        candidateId,
      },
      include: {
        job: true,
        candidate: true,
      },
      orderBy: { score: 'desc' },
    });
    return matches;
  }

  private async recalculateMatchesForJob(job: any) {
    const candidates = await this.prisma.candidate.findMany();

    for (const candidate of candidates) {
      const score = this.calculateScore(job, candidate);
      if (score > 0) {
        await this.upsertMatch(job.id, candidate.id, score);
      }
    }
  }

  private async recalculateMatchesForCandidate(candidate: any) {
    const jobs = await this.prisma.job.findMany();
    for (const job of jobs) {
      const score = this.calculateScore(job, candidate);
      if (score > 0) {
        await this.upsertMatch(job.id, candidate.id, score);
      }
    }
  }

  private calculateScore(job: any, candidate: any): number {
    const matchedSkill = candidate.skills.filter((skill) => {
      return job.skills.includes(skill);
    });

    if (matchedSkill.length === 0) return 0;

    const skillScore = matchedSkill.length / job.skills.length;
    const experienceScore = Math.min(candidate.experience / job.experience, 1);

    return Number((skillScore * 0.75 + experienceScore * 0.3).toFixed(2));
  }

  private async upsertMatch(jobId: string, candidateId: string, score: number) {
    await this.prisma.match.upsert({
      where: {
        jobId_candidateId: {
          jobId,
          candidateId,
        },
      },
      update: { score },
      create: {
        jobId,
        candidateId,
        score,
      },
    });
  }
}
