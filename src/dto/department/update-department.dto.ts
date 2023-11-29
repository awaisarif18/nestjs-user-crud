/* eslint-disable prettier/prettier */
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateDepartmentDto {
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  name?: string;

  @MaxLength(150)
  @MinLength(10)
  @IsString()
  description?: string;
}
