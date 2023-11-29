/* eslint-disable prettier/prettier */
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  name!: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(10)
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  @MaxDate(new Date())
  createdOn!: Date;

  @IsNotEmpty()
  @IsDate()
  @MaxDate(new Date())
  modifiedOn!: Date;

  @IsNumber()
  user: number;
}
