/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/entities/department.entity';
import { RoleEntity } from 'src/entities/role.entity';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/entities/user.entity';

dotenv.config();

const entities = [UserEntity, DepartmentEntity, RoleEntity];
export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: entities,
  synchronize: true,
  logging: true,
};
