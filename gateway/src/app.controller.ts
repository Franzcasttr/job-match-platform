import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './module/dto/login.dto';
import { RegisterDto } from './module/dto/registerDTO.dto';

@Controller('auth')
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authClient.send('auth.register', registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authClient.send('auth.login', loginDto);
  }
}
