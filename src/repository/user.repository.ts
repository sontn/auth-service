import { Repository } from 'typeorm';
import { User } from 'src/repository/entities/user.model';
import { IUserRepository } from 'src/repository/interfaces/user.repository.interface';

export class UserRepository implements IUserRepository<User> {
  private repository: Repository<User>;

  async findOneBy(criteria: Partial<User>): Promise<User | undefined> {
    return this.repository.findOneBy(criteria);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  // Implement other methods as needed
}
