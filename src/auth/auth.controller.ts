import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User } from 'src/repository/entities/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO): Promise<{ jwtToken: string }> {
    // Convert userDTO to user entity
    const user = new User();
    Object.assign(user, userDTO);
    return this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() userDTO: UserDTO) {
    const user = new User();
    Object.assign(user, userDTO);
    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
