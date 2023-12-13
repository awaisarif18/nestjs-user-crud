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

  //CRUD
  async createUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const userToCreate = { ...createUserDto, password: hashedPassword };
      return await this.userRepo.insert(userToCreate);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      console.log('Received users fetch request');
      return await this.userRepo.find();
    } catch (error) {
      console.error('Error fetching users:', error);
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
      console.error('Error fetching user:', error);
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
      console.error('Error updating user:', error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      console.log('Received user delete request');
      return await this.userRepo.delete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  //Find By Username
  async findByName(username: string): Promise<UserEntity> {
    try {
      console.log('Received user fetch request');
      return await this.userRepo.findOne({ where: { username } });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  // Change password based on nickname
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
    }
  }

  //Hash password to secure from theft
  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }
}
