/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Length(7, 30)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
