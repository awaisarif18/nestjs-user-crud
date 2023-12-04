/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from 'src/Modules/entities/role.entity';

export class UpdateRoleDto {
  @IsOptional()
  @IsEnum(UserRole)
  name?: UserRole;

  @IsOptional()
  @IsString()
  @Length(10, 255)
  description?: string;
}
