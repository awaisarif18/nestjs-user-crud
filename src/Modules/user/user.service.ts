import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const userToCreate = { ...createUserDto, password: hashedPassword };
      return await this.userRepo.insert(userToCreate);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      console.log('Received users fetch request');
      return await this.userRepo.find({});
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      console.log('Received user update request');
      return await this.userRepo.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      console.log('Received user delete request');
      return await this.userRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findByName(username: string): Promise<UserEntity> {
    try {
      console.log('Received user fetch request');
      return await this.userRepo.findOne({ where: { username } });
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    password: string,
    nickname: string,
    username: string,
  ): Promise<UpdateResult> {
    try {
      const user = await this.userRepo.findOne({ where: { username } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.nickname !== nickname) {
        throw new NotFoundException('Nickname is incorrect');
      }

      const hashedPassword = await this.hashPassword(password);

      user.password = hashedPassword;
      return this.userRepo.update(user.id, user);
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }
}
