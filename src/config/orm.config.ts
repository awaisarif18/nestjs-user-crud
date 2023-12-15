/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/Modules/entities/department.entity';
import { RoleEntity } from 'src/Modules/entities/role.entity';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/Modules/entities/user.entity';
import { ContactEntity } from 'src/Modules/entities/contact.entity';

dotenv.config();

const entities = [UserEntity, DepartmentEntity, RoleEntity, ContactEntity];
export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: entities,
  synchronize: false,
  logging: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
