import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.model';
import { User } from 'src/entity/user.model';
import { Comment } from 'src/entity/comment.model';

@Module({
    imports: [TypeOrmModule.forFeature([User, Article, Comment])],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule {}
