// create User Entity
import { IsEmail, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column({default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
}
