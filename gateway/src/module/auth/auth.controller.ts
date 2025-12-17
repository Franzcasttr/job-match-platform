import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/registerDTO.dto';
import { LoginDto } from '../dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
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
