import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signUp(user: User) {
    // find user by email
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    // throw error if user already exists
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // bcrypt password
    user.password = await bcrypt.hash(user.password, 12);

    await this.userRepository.save(user);

    // remove password from response
    delete user.password;

    return user;
  }
}
