import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.model';
import { Article } from 'src/entity/article.model';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.model';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllArticles() {
    return this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .select([
        'article.id',
        'article.title',
        'article.content',
        'article.createdAt',
        'article.updatedAt',
        'author.id',
        'author.email',
      ])
      .leftJoinAndSelect('article.comments', 'comments')
      .getMany();
  }

  async createArticle(article: Article, user: User) {
    try {
      // user.id = 1000;
      // Author is required to create an article
      article.author = user;
      return await this.articleRepository.save(article);
    } catch (error) {
      // use logger to log the error

      throw new BadRequestException('Failed to create an article');
    }
  }
}
