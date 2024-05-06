import { Injectable } from '@nestjs/common';
import { Hasher } from './hasher.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashService implements Hasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
