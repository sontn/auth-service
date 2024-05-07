import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utilities/jwt/constants';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { RepositoryModule } from './repository/repository.module';
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
    AuthModule,
    BlogModule,
    RepositoryModule,
  ],
})
export class AppModule {}
