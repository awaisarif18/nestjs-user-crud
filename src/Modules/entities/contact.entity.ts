/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('Contact')
export class ContactEntity extends BaseEntity {
  @Column({ length: 30, nullable: false, type: String })
  email: string;

  @Column({ length: 30, nullable: false })
  subject: string;

  @Column({ length: 255, nullable: false, type: String })
  message: string;
}
