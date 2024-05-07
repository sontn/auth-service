import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../repository/entities/article.model';
import { User } from '../repository/entities/user.model';
import { Comment } from '../repository/entities/comment.model';
@Module({
  imports: [TypeOrmModule.forFeature([User, Article, Comment])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
