/* eslint-disable prettier/prettier */
import { MinLength } from 'class-validator';
import { DepartmentEntity } from 'src/Modules/entities/department.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseEntity } from './base.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({ length: 30, nullable: false, type: String })
  @MinLength(3)
  username: string;

  @Column({ length: 30, unique: true, nullable: false, type: String })
  @MinLength(7)
  email: string;

  @Column({ length: 60, nullable: false, type: String })
  @MinLength(7)
  password: string;

  @Column({ length: 30, nullable: false, type: String })
  @MinLength(4)
  nickname: string;

  @ManyToOne(() => DepartmentEntity, (department) => department.User, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  Department: number;

  @ManyToOne(() => RoleEntity, (role) => role.User, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  Role: number;
}
