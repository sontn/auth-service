import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './blog/article/article.module';

@Module({
  imports: [AuthModule, ArticleModule],
})
export class AppModule {}
