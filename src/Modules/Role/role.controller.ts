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
    return await this.roleService.createRole(createRoleDto);
  }

  @Get()
  // localhost:3000/role
  //enkwwknd
  async findAll(): Promise<RoleEntity[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  // localhost:3000/role/id
  async findOne(@Param('id') id: number): Promise<RoleEntity> {
    return await this.roleService.findOne(id);
  }

  @Patch(':id')
  // localhost:3000/role/id
  async update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return await this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  // localhost:3000/role/id
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.roleService.remove(id);
  }
}
