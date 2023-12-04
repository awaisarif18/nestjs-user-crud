/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

export enum UserRole {
  ADMIN = 'Admin',
  SE = 'Software Engineer',
  QA = 'Quality Assurance Analyst',
  PR = 'Product Manager',
  CSS = 'Customer Support Specialist',
  ITSA = 'IT Systems Administrator',
  INTERN = 'Intern',
}

@Entity('Role')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'enum', enum: UserRole, default: UserRole.INTERN })
  name: UserRole;

  @Column({ type: String, nullable: true, length: 255 })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.Role)
  @IsNumber()
  User: number;
}
