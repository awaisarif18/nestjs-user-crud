/* eslint-disable prettier/prettier */
import { IsNumber, MinLength } from 'class-validator';
import { UserEntity } from './user.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('Department')
export class DepartmentEntity extends BaseEntity {
  @Column({ length: 30, nullable: false, type: String })
  @MinLength(3)
  name: string;

  @Column({ length: 255, type: String, nullable: true })
  @MinLength(10)
  description: string;

  @OneToMany(() => UserEntity, (user) => user.Department)
  @IsNumber()
  User: number;
}
