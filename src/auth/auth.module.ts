import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { HashModule } from 'src/utilities/hash/hash.module';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [HashModule, RepositoryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
