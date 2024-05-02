import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Article } from './article.model';
import { User } from './user.model';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  content: string;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
