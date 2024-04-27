import { readFileSync } from 'fs';
import { resolve } from 'path';

export const jwtConstants = {
  secret: readFileSync(resolve(__dirname, '../../private_key.pem'), 'utf8'),
};
