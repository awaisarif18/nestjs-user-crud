/* eslint-disable prettier/prettier */
import { IsNumber, MinLength } from 'class-validator';

import { UserEntity } from 'src/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30, nullable: false, type: String })
  @MinLength(3)
  name!: string;

  @Column({ length: 255, type: String })
  @MinLength(10)
  description?: string;

  @CreateDateColumn({ nullable: false, default: new Date(), type: Date })
  createdOn!: Date;

  @UpdateDateColumn({ nullable: false, default: new Date(), type: Date })
  modifiedOn!: Date;

  @OneToMany(() => UserEntity, (user) => user.department)
  @IsNumber()
  user: number;
}
