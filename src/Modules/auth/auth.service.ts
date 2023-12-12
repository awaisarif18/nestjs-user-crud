import { LoginDto } from '../../dto/auth/login.dto';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      console.log(loginDto);
      const { username, password } = loginDto;
      const user = await this.usersService.findByName(username);

      if (!user) {
        throw new NotFoundException('User not found');
      } else if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid password');
      } else {
        return {
          access_token: await this.jwtService.signAsync({ user }),
          user,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
