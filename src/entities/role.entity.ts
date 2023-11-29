/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum UserRole {
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  PROJECT_MANAGER = 'project manager',
  INTERN = 'intern',
}

@Entity('Role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.INTERN })
  name!: UserRole;

  @Column({ type: String, nullable: true, length: 255 })
  description?: string;

  @CreateDateColumn({ nullable: false, default: new Date(), type: Date })
  createdOn!: Date;

  @UpdateDateColumn({ nullable: false, default: new Date(), type: Date })
  modifiedOn!: Date;

  @OneToMany(() => UserEntity, (user) => user.role)
  @IsNumber()
  user: number;
}
