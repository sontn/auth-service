import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './blog/article/article.module';
import { CommentModule } from './blog/comment/comment.module';

@Module({
  imports: [AuthModule, ArticleModule, CommentModule],
})
export class AppModule {}
