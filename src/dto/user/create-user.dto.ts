/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Length(7, 30)
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Length(7, 30)
  @IsNotEmpty()
  @IsString()
  password!: string;

  @Length(4, 30)
  @IsNotEmpty()
  nickname!: string;

  @IsOptional()
  Department?: number;

  @IsNotEmpty()
  Role!: number;
}
