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
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const userToCreate = { ...createUserDto, password: hashedPassword };
    return await this.userRepo.insert(userToCreate);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find({});
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async findByName(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  async changePassword(
    password: string,
    nickname: string,
    username: string,
  ): Promise<UpdateResult> {
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
  }

  hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
