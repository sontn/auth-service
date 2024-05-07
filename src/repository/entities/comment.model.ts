import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Article } from './article.model';
import { User } from './user.model';
import { BaseModel } from './base.model';

@Entity('comments')
export class Comment extends BaseModel {
  @Column({ nullable: true })
  authorId: number;

  @Column()
  articleId: number;

  @Column()
  comment: string;
}
