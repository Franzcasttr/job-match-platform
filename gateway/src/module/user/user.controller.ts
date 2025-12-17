import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  async createProfile(profileDto: any) {
    return this.userClient.send('user.create', profileDto);
  }

  async getProfile(userId: string) {
    return this.userClient.send('user.get', userId);
  }

  async updateProfile(userId: string, skills: string[]) {
    return this.userClient.send('user.update,skills', { userId, skills });
  }
}
