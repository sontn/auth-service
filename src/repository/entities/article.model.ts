import {
  Column,
  Entity,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { BaseModel } from './base.model';

@Entity('articles')
export class Article extends BaseModel {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  content: string;

  @Column()
  authorId: number;
}
