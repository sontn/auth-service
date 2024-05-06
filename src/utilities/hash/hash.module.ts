import { Module } from '@nestjs/common';
import { BcryptHashService } from './bcrypt-hash.service';
import { Argon2HashService } from './argon2-hash.service';


const configHashServiceProviders = {
  provide: 'Hasher',
  useClass:
    process.env.HASH_SERVICE === 'bcrypt'
      ? BcryptHashService
      : Argon2HashService,
};

@Module({
  providers: [
    configHashServiceProviders
  ],
  exports: ['Hasher'],
})
export class HashModule {}
