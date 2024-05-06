import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.model';
import { HashModule } from 'src/hash/hash.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
