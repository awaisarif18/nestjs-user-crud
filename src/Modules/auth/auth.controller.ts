import { LoginDto } from '../../dto/auth/login.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @Post('login')
  // localhost:300/auth/login
  login(@Body() loginDto: LoginDto) {
    try {
      console.log('Recieved login request', loginDto);
      const result = this.authService.login(loginDto);
      console.log('Login Successful', result);
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  // localhost:3000/auth/profile
  getProfile(@Request() req) {
    return req.user;
  }
}
