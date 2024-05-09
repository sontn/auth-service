import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
  Param,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { ArticleDTO } from './dto/article.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { UpdateArticleDTO } from './dto/update-article.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('/articles')
  async getAllArticles() {
    return this.blogService.getAllArticles();
  }

  @Get('/article/:articleId')
  async getArticleById(@Param('articleId') articleId: number) {
    return this.blogService.getArticleById(articleId);
  }

  @Post('/article/create')
  @UseGuards(AuthGuard)
  async createArticleByAuthorId(@Body() article: ArticleDTO, @Request() req) {
    return this.blogService.createArticleByAuthorId(article, req.user.id);
  }

  @Put('/article/update/:articleId')
  @UseGuards(AuthGuard)
  async updateArticle(
    @Param('articleId') articleId: number,
    @Body() article: UpdateArticleDTO,
    @Request() req,
  ) {
    return this.blogService.updateArticleByAuthorId(
      articleId,
      article,
      req.user.id,
    );
  }
}
