import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utilities/jwt/constants';
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '300s',
      },
    }),
    RepositoryModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
