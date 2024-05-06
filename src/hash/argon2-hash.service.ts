import { Injectable } from '@nestjs/common';
import { Hasher } from './hasher.interface';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2HashService implements Hasher {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
