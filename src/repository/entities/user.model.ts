import { Entity,Column } from 'typeorm';

import { IsEmail, MinLength } from 'class-validator';
import { BaseModel } from './base.model';

@Entity('users')
export class User extends BaseModel {
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(6)
  password: string;
}
