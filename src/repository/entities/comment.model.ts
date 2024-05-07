import { Entity, Column } from 'typeorm';
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
