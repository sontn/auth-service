import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.model';
import { Article } from 'src/entity/article.model';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  getAllArticles() {
    return this.articleRepository.find();
  }

  createArticle(article: Article) {
    return this.articleRepository.save({
      title: 'New Article',
      content: 'This is a new article',
    });
  }
}
