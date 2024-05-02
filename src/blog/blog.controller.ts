import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Article } from '../entity/article.model';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get('/getallarticles')
    async getAllArticles() {
        return this.blogService.getAllArticles();
    }

    @Post('/createarticle')
    async createArticle(@Body() article: Article) {
        return this.blogService.createArticle(article);
    }
}
