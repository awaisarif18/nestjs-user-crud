import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../Modules/user/user.module';
import { DepartmentModule } from '../Modules/Department/department.module';
import { ormConfig } from '../config/orm.config';
import { ConfigModule } from '@nestjs/config';
import 'reflect-metadata';
import { RoleModule } from '../Modules/Role/role.module';
import { AuthModule } from '../Modules/auth/auth.module';
import { ContactModule } from '../Modules/contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    DepartmentModule,
    RoleModule,
    AuthModule,
    ContactModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
