import { Repository } from 'typeorm';
import { IRepository } from 'src/repository/interfaces/repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.model';

@Injectable()
export class ArtcileRepository implements IRepository<Article> {
  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>,
  ) {}

  async findOneBy(criteria: Partial<Article>): Promise<Article | undefined> {
    return this.repository.findOneBy(criteria);
  }

  async save(user: Article): Promise<Article> {
    return this.repository.save(user);
  }

  async findAll(): Promise<Article[]> {
    return this.repository.find();
  }
  // Implement other methods as needed
  async delete(criteria: Partial<Article>): Promise<void> {
    await this.repository.delete(criteria);
  }
}
