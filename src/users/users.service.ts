import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
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
