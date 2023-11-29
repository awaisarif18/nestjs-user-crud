/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsDate,
  MaxDate,
  IsEnum,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserRole } from 'src/entities/role.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole)
  name!: UserRole;

  @IsString()
  @MaxLength(255)
  description?: string;

  @IsNotEmpty()
  @IsDate()
  @MaxDate(new Date())
  createdOn!: Date;

  @IsNotEmpty()
  @IsDate()
  @MaxDate(new Date())
  modifiedOn!: Date;
}
