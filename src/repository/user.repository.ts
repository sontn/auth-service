import { Repository } from 'typeorm';
import { User } from 'src/repository/entities/user.model';
import { IRepository } from 'src/repository/interfaces/repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IRepository<User> {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findOneBy(criteria: Partial<User>): Promise<User | undefined> {
    return this.repository.findOneBy(criteria);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  // Implement other methods as needed
  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
