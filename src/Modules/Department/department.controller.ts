import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from '../../dto/department/create-department.dto';
import { UpdateDepartmentDto } from '../../dto/department/update-department.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { DepartmentEntity } from 'src/Modules/entities/department.entity';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  // localhost:3000/department
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<InsertResult> {
    try {
      return await this.departmentService.createDepartment(createDepartmentDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  // localhost:3000/department
  async findAll(): Promise<DepartmentEntity[]> {
    try {
      return await this.departmentService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  // localhost:3000/department/id
  async findOne(@Param('id') id: number): Promise<DepartmentEntity> {
    try {
      return await this.departmentService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  // localhost:3000/department/id
  async update(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    try {
      return await this.departmentService.updateDepartment(
        id,
        updateDepartmentDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  // localhost:3000/department/id
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    try {
      return await this.departmentService.removeDepartment(id);
    } catch (error) {
      throw error;
    }
  }
}
