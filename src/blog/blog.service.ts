import { Injectable } from '@nestjs/common';
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

  getAllArticles() {
    return this.articleRepository.find();
  }

  async createArticle(article: Article, user: User) {
    const findUser = await this.userRepository.findOneBy({ email: user.email });

    // remove password from user object
    // delete findUser.password;

    article.author = findUser;

    return await this.articleRepository.save(article);
  }
}
