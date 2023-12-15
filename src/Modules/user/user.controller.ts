import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  // localhost:3000/user
  async create(@Body() createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      console.log('Received signup request:', createUserDto);
      const result = await this.usersService.createUser(createUserDto);
      console.log('User created successfully:', result);

      return result;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  @Get()
  // localhost:3000/user
  async findAll(): Promise<UserEntity[]> {
    try {
      console.log('Received users fetch request');
      return await this.usersService.findAll();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  @Get(':id')
  // localhost:3000/user/id
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    try {
      console.log('Received user fetch request');
      return await this.usersService.findOne(id);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  @Patch(':id')
  // localhost:3000/user/id
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      console.log('Received update request:', updateUserDto);
      const result = await this.usersService.update(id, updateUserDto);
      console.log('User updated successfully:', result);
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  @Delete(':id')
  // localhost:3000/user/id
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }

  @Patch('change-password/:username')
  // localhost:3000/user/changePassword/username
  async changePassword(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      console.log('Received change password request:', updateUserDto);
      const result = await this.usersService.changePassword(
        updateUserDto.password,
        updateUserDto.nickname,
        username,
      );
      console.log('Password changed successfully:', result);
      return result;
    } catch (error) {
      console.error('Error changing password:', error);
    }
  }
}
