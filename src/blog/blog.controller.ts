import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Article } from '../entity/article.model';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get('/getallposts')
    async getAllBlogs() {
        return this.blogService.getAllBlogs();
    }

    @Post('/createarticle')
    async createArticle(@Body() post: Article) {
        return this.blogService.createArticle(post);
    }
}
