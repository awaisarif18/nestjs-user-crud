/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @MaxLength(30)
  @IsString()
  name?: string;

  @MaxLength(60)
  @MinLength(7)
  @IsEmail()
  email?: string;

  @IsStrongPassword()
  @MinLength(7)
  @MaxLength(30)
  password?: string;

  @MinLength(4)
  @MaxLength(30)
  nickname?: string;

  @IsNumber()
  department?: number;
}
