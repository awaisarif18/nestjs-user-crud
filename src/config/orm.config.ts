/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DepartmentEntity } from '../Modules/entities/department.entity';
import { RoleEntity } from '../Modules/entities/role.entity';
import * as dotenv from 'dotenv';
import { UserEntity } from '../Modules/entities/user.entity';
import { ContactEntity } from '../Modules/entities/contact.entity';

dotenv.config();

const entities = [UserEntity, DepartmentEntity, RoleEntity, ContactEntity];
export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  schema: process.env.DATABASE_SCHEMA,
  url: process.env.DATABASE_URL,
  entities: entities,
  synchronize: false,
  logging: true,
};
