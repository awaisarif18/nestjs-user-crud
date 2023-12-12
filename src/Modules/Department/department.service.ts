import { UpdateDepartmentDto } from '../../dto/department/update-department.dto';
import { CreateDepartmentDto } from '../../dto/department/create-department.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from '../entities/department.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<InsertResult> {
    try {
      return await this.departmentRepository.insert(createDepartmentDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<DepartmentEntity[]> {
    try {
      return await this.departmentRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<DepartmentEntity> {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id },
      });
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return department;
    } catch (error) {
      throw error;
    }
  }

  async updateDepartment(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    try {
      const result = await this.departmentRepository.update(
        id,
        updateDepartmentDto,
      );
      if (result.affected === 0) {
        throw new NotFoundException('Department not found');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async removeDepartment(id: number): Promise<DeleteResult> {
    try {
      const result = await this.departmentRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Department not found');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
