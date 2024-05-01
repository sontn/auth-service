import { Controller, Get } from '@nestjs/common';

@Controller('blog')
export class BlogController {
    @Get()
    async getAllBlogs() {
        return 'All Blogs';
    }
}
