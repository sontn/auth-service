import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from './article.model';
import { Comment } from './comment.model';
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

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
