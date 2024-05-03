import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Article } from './article.model';
import { User } from './user.model';
import { BaseModel } from './base.model';

@Entity('comments')
export class Comment extends BaseModel {
  @Column()
  email: string;

  @Column()
  content: string;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;
}
