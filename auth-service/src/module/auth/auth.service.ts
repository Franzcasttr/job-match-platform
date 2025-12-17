import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private users = [];

  async register(registerDto: RegisterDto) {
    const { email, password, role } = registerDto;
    const hashed = await bcrypt.hash(password, 10);

    const user = { id: Date.now(), email, password: hashed, role };

    this.users.push(user);
    return { id: user.id, email: user.email, role: user.role };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const access_token = jwt.sign({ sub: user.id }, 'secret', {
      expiresIn: '1h',
    });
    return { access_token };
  }
}
