import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

  async getArticleById(articleId: number) {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    return article;
  }

  async createArticleByAuthorId(article: ArticleDTO, authorId: number) {
    try {
      article.authorId = authorId;
      return await this.articleRepository.save(article);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateArticleByAuthorId(
    articleId: number,
    article: ArticleDTO,
    authorId: number,
  ) {
    try {
      const existedArticle = await this.articleRepository.findOneBy({
        id: articleId,
      });
      if (!existedArticle) {
        throw new BadRequestException('Article not found');
      }

      if (existedArticle.authorId !== authorId) {
        throw new BadRequestException('You are not the author of this article');
      }

      existedArticle.title = article.title;
      existedArticle.content = article.content;
      existedArticle.updatedAt = new Date();

      return await this.articleRepository.save(existedArticle);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteArticleByAuthorId(articleId: number, authorId: number) {
    try {
      const existedArticle = await this.articleRepository.findOneBy({
        id: articleId,
      });
      if (!existedArticle) {
        throw new BadRequestException('Article not found');
      }

      if (existedArticle.authorId !== authorId) {
        throw new BadRequestException('You are not the author of this article');
      }

      return await this.articleRepository.delete(existedArticle);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
