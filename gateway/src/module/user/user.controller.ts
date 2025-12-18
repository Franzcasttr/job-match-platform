import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  @Post('profile')
  async createProfile(@Body() profileDto: any) {
    return this.userClient.send('user.create', profileDto);
  }

  @Get('profile')
  async getProfile(@Query('userId') userId: string) {
    return this.userClient.send('user.get', userId);
  }

  @Post('skills')
  updateSkills(@Body() body: any) {
    return this.userClient.send('user.update.skills', body);
  }
}
