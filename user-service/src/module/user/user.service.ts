import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  // private readonly users = new Map<string, any>();
  constructor(
    @Inject('JOB_SERVICE') private jobClient: ClientProxy,
    private prisma: PrismaService,
  ) {}

  async createProfile(profileDto: any) {
    const profile = {
      userId: profileDto.userId,
      role: profileDto.role,
      ...profileDto.profile,
    };

    // this.users.set(profileDto.userId, profile);

    await this.prisma.userProfile.upsert({
      where: { id: profileDto.userId },
      update: profileDto.profile,
      create: {
        id: profileDto.userId,
        ...profileDto.profile,
      },
    });

    this.jobClient.emit('user.profile.updated', profile);
    return profile;
  }

  async getProfile(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { id: userId },
    });
    return profile;
  }

  async updateProfile(userId: string, skills: string[]) {
    const user = await this.prisma.userProfile.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    user.skills = skills;
    // this.users.set(userId, user);

    this.jobClient.emit('user.profile.updated', user);
    return user;
  }
}
