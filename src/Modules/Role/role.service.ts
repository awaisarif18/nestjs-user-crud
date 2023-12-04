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
    return await this.roleRepo.insert(createRoleDto);
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.roleRepo.find({});
  }

  async findOne(id: number): Promise<RoleEntity> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return await this.roleRepo.update(id, updateRoleDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.roleRepo.delete(id);
  }
}
