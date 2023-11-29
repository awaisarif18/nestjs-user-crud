/* eslint-disable prettier/prettier */
import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';
import { DepartmentEntity } from 'src/entities/department.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false, type: String })
  @MinLength(3)
  name!: string;

  @Column({ length: 30, unique: true, nullable: false, type: String })
  @IsEmail()
  @MinLength(7)
  email!: string;

  @Column({ length: 60, nullable: false })
  @IsStrongPassword()
  @MinLength(7)
  password!: string;

  @Column({ length: 30, nullable: true })
  @MinLength(4)
  nickname?: string;

  @CreateDateColumn({ nullable: false, default: new Date(), type: Date })
  createdOn!: Date;

  @UpdateDateColumn({ nullable: false, default: new Date(), type: Date })
  modifiedOn!: Date;

  @ManyToOne(() => DepartmentEntity, (department) => department.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department?: number;

  @ManyToOne(() => RoleEntity, (role) => role.user, { nullable: false })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role!: number;
}
