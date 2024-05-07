import { IsEmail, MinLength } from 'class-validator';

export class UserDTO {
  id: number;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
