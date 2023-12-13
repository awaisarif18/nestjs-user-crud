/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MinLength } from 'class-validator';

@Entity('Contact')
export class ContactEntity extends BaseEntity {
  @Column({ length: 30, nullable: false, type: String })
  @MinLength(3)
  email: string;

  @Column({ length: 30, nullable: false, type: String })
  @MinLength(3)
  subject: string;

  @Column({ length: 255, nullable: false, type: String })
  @MinLength(3)
  message: string;
}
