/* eslint-disable prettier/prettier */
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ nullable: false, default: new Date(), type: Date })
  createdOn: Date;

  @UpdateDateColumn({ nullable: false, default: new Date(), type: Date })
  modifiedOn: Date;
}
