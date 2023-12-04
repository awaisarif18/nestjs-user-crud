/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @Length(3, 30)
  @IsString()
  name!: string;

  @IsOptional()
  @Length(10, 255)
  @IsString()
  description?: string;
}
