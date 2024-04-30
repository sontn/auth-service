import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/auth/user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: User) {
    return this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }
}
