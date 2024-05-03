import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.model';
import { User } from './user.model';
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

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}
