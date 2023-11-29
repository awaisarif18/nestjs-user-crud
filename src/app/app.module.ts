import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../Modules/user/user.module';
import { DepartmentModule } from '../Modules/Department/department.module';
import { ormConfig } from '../config/orm.config';
import { ConfigModule } from '@nestjs/config';
import 'reflect-metadata';
import { RoleModule } from 'src/Modules/Role/role.module';
import { AuthModule } from 'src/Modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    DepartmentModule,
    RoleModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
