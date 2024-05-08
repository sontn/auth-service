import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { HashModule } from 'src/utilities/hash/hash.module';
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
    HashModule,
    RepositoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
