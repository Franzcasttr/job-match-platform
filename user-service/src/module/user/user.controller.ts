import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.create')
  async createProfile(profileDto: any) {
    return this.userService.createProfile(profileDto);
  }

  @MessagePattern('user.get')
  async getProfile(userId: string) {
    return this.userService.getProfile(userId);
  }

  @MessagePattern('user.update.skills')
  async updateProfile(userId: string, skills: string[]) {
    return this.userService.updateProfile(userId, skills);
  }
}
