import { LoginDto } from '../../dto/auth/login.dto';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    console.log(loginDto);
    const { name, password } = loginDto;
    const user = await this.usersService.findByName(name);

    if (!user) {
      throw new NotFoundException();
    } else if (user?.password !== password) {
      throw new UnauthorizedException();
    } else {
      return {
        access_token: await this.jwtService.signAsync({ user }),
      };
    }
  }
}
