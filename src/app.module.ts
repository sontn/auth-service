import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { User } from './entity/user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utilities/jwt/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Article } from './entity/article.model';
import { Comment } from './entity/comment.model';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';

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
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '300s',
      },
    }),
    AuthModule,
    BlogModule,
  ],
})

export class AppModule {}

