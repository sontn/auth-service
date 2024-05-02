import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.model';
import { Article } from 'src/entity/article.model';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Article)
    private postRepository: Repository<Article>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  getAllBlogs() {
    return this.postRepository.find();
  }

  createArticle(post: Article) {
    return this.postRepository.save({
      title: 'New Article',
      content: 'This is a new article',
    });
  }
}
