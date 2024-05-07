import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../repository/entities/article.model';
import { User } from '../repository/entities/user.model';
import { Comment } from '../repository/entities/comment.model';

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
    return this.articleRepository.find();
  }

  async createArticle(article: Article, user: User) {
    try {
      // Author is required to create an article
      article.authorId = user.id;
      return await this.articleRepository.save(article);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
