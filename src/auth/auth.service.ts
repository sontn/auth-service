import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hasher } from 'src/utilities/hash/hasher.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('Hasher') private hasher: Hasher,

    private jwtService: JwtService,
    
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(user: User): Promise<{ jwtToken: string }> {
    // find user by email
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    // throw error if user already exists
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // hash password
    user.password = await this.hasher.hash(user.password);

    await this.userRepository.save(user);

    const jwtToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return { jwtToken };
  }
  async login(user: User) {
    // find user by email
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    // throw error if user does not exist
    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // compare password
    const isPasswordValid = await this.hasher.compare(
      user.password,
      existingUser.password,
    );

    // throw error if password is invalid
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate token jwt token
    const jwtToken = this.jwtService.sign({
      id: existingUser.id,
      email: existingUser.email,
    });

    // return refresh token in response
    return { jwtToken };
  }
}
