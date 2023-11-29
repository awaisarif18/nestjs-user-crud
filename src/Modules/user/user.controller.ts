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
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Public()
  @Post()
  // localhost:3000/user
  async create(@Body() createUserDto: CreateUserDto): Promise<InsertResult> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  // localhost:3000/user
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  // localhost:3000/user/id
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  // localhost:3000/user/id
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  // localhost:3000/user/id
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.usersService.remove(id);
  }
}
