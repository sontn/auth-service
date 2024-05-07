import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../repository/entities/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hasher } from 'src/utilities/hash/hasher.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('Hasher') private hasher: Hasher,

    private jwtService: JwtService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(userDTO: UserDTO): Promise<{ jwtToken: string }> {
    const existingUser = await this.userRepository.findOneBy({
      email: userDTO.email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    userDTO.password = await this.hasher.hash(userDTO.password);

    const user = await this.userRepository.save(userDTO);

    const jwtToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return { jwtToken };
  }

  async login(useDTO: UserDTO) {
    const existingUser = await this.userRepository.findOneBy({
      email: useDTO.email,
    });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hasher.compare(
      useDTO.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtToken = this.jwtService.sign({
      id: existingUser.id,
      email: existingUser.email,
    });

    return { jwtToken };
  }
}
