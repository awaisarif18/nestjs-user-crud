/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @Length(3, 30)
  @IsString()
  @IsOptional()
  username?: string;

  @Length(7, 30)
  @IsEmail()
  @IsOptional()
  email?: string;

  @Length(7, 30)
  @IsOptional()
  password?: string;

  @Length(4, 30)
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsNumber()
  @IsOptional()
  Department?: number;

  @IsNumber()
  @IsOptional()
  Role?: number;
}
