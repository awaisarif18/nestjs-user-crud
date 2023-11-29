/* eslint-disable prettier/prettier */
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(30)
  @IsString()
  name!: string;

  @IsNotEmpty()
  @MaxLength(60)
  @MinLength(7)
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(7)
  @MaxLength(30)
  password!: string;

  @IsOptional()
  @MinLength(4)
  @MaxLength(30)
  nickname?: string;

  @IsNotEmpty()
  @IsDate()
  @MaxDate(new Date())
  createdOn!: Date;

  @IsNotEmpty()
  @IsDate()
  @MaxDate(new Date())
  modifiedOn!: Date;

  @IsNumber()
  department?: number;

  @IsNotEmpty()
  @IsNumber()
  role!: number;
}
