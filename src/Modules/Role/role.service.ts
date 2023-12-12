import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'src/dto/role/create-role.dto';
import { UpdateRoleDto } from 'src/dto/role/update-role.dto';
import { RoleEntity } from 'src/Modules/entities/role.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<InsertResult> {
    try {
      console.log('Received role create request');
      const result = await this.roleRepo.insert(createRoleDto);
      console.log('Result:', result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<RoleEntity[]> {
    try {
      console.log('Received roles fetch request');
      return await this.roleRepo.find({});
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<RoleEntity> {
    try {
      const role = await this.roleRepo.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      return role;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    try {
      const result = await this.roleRepo.update(id, updateRoleDto);
      if (result.affected === 0) {
        throw new NotFoundException('Role not found');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      console.log('Received role delete request');
      return await this.roleRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
