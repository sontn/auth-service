import { BadRequestException, Inject, Injectable } from '@nestjs/common';

// import { Repository } from 'typeorm';
import { Article } from '../repository/entities/article.model';
import { User } from '../repository/entities/user.model';

import { ArtcileRepository } from 'src/repository/article.repository';
import { IRepository } from 'src/repository/interfaces/repository.interface';
import { ArticleDTO } from './dto/article.dto';

@Injectable()
export class BlogService {
  constructor(
    @Inject(ArtcileRepository)
    private articleRepository: IRepository<ArticleDTO>,
  ) {}

  async getAllArticles() {
    return this.articleRepository.findAll();
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
