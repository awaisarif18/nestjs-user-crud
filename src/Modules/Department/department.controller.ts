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
import { DepartmentEntity } from 'src/entities/department.entity';
import { Public } from '../auth/decorators/public.decorator';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Public()
  @Post()
  // localhost:3000/department
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<InsertResult> {
    return await this.departmentService.createDepartment(createDepartmentDto);
  }

  @Get()
  // localhost:3000/department
  async findAll(): Promise<DepartmentEntity[]> {
    return await this.departmentService.findAll();
  }

  @Get(':id')
  // localhost:3000/department/id
  async findOne(@Param('id') id: number): Promise<DepartmentEntity> {
    return await this.departmentService.findOne(id);
  }

  @Patch(':id')
  // localhost:3000/department/id
  async update(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    return await this.departmentService.updateDepartment(
      id,
      updateDepartmentDto,
    );
  }

  @Delete(':id')
  // localhost:3000/department/id
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.departmentService.removeDepartment(id);
  }
}
