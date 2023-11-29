/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from 'src/entities/role.entity';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole)
  name?: UserRole;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description?: string;
}
