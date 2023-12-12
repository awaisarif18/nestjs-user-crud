import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from 'src/dto/role/create-role.dto';
import { UpdateRoleDto } from 'src/dto/role/update-role.dto';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { RoleEntity } from 'src/Modules/entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  // localhost:3000/role
  async create(@Body() createRoleDto: CreateRoleDto): Promise<InsertResult> {
    try {
      return await this.roleService.createRole(createRoleDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  // localhost:3000/role
  async findAll(): Promise<RoleEntity[]> {
    try {
      return await this.roleService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  // localhost:3000/role/id
  async findOne(@Param('id') id: number): Promise<RoleEntity> {
    try {
      return await this.roleService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  // localhost:3000/role/id
  async update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    try {
      return await this.roleService.update(id, updateRoleDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  // localhost:3000/role/id
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    try {
      return await this.roleService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
