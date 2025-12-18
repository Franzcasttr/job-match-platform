import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  private readonly users = new Map<string, any>();
  constructor(@Inject('JOB_SERVICE') private jobClient: ClientProxy) {}

  async createProfile(profileDto: any) {
    const profile = {
      userId: profileDto.userId,
      role: profileDto.role,
      ...profileDto.profile,
    };

    this.users.set(profileDto.userId, profile);
    this.jobClient.emit('user.profile.updated', profile);
    return profile;
  }

  async getProfile(userId: string) {
    const profile = this.users.get(userId);
    return profile;
  }

  async updateProfile(userId: string, skills: string[]) {
    const user = this.users.get(userId);
    // if (!user) {
    //   throw new Error('User not found');
    // }

    user.skills = skills;
    // this.users.set(userId, user);

    this.jobClient.emit('user.profile.updated', user);
    return user;
  }
}
