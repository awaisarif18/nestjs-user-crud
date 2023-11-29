/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MaxLength(30)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(30)
  password!: string;
}
