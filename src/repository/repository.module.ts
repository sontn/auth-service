import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/repository/entities/user.model';
import { Article } from 'src/repository/entities/article.model';
import { Comment } from 'src/repository/entities/comment.model';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from 'src/repository/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Article, Comment]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoryModule {}
