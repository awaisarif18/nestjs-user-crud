/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsOptional,
  Length,
} from 'class-validator';
import { UserRole } from 'src/Modules/entities/role.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole)
  name!: UserRole;

  @IsString()
  @Length(10, 255)
  @IsOptional()
  description?: string;
}
