import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Article } from '../entity/article.model';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/entity/user.model';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('/articles')
  async getAllArticles() {
    return this.blogService.getAllArticles();
  }

  @Post('/article/create')
  @UseGuards(AuthGuard)
  async createArticle(@Body() article: Article, @Request() req) {
    const user = new User();
    user.id = req.user.id;
    // user.id = 100;
    user.email = req.user.email;

    return this.blogService.createArticle(article, user);
  }
}
