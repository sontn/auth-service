import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../repository/entities/user.model';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: User): Promise<{ jwtToken: string }> {
    return this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
