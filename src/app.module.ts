import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './entity/user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlogController } from 'src/blog/blog.controller';
import { BlogService } from 'src/blog/blog.service';
import { Post } from './entity/post.model';
import { Comment } from './entity/comment.model';


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
    TypeOrmModule.forFeature([User, Post, Comment]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '300s',
      },
    }),    
  ],
  controllers: [AuthController, BlogController],
  providers: [AuthService, BlogService],
})
export class AppModule {}
