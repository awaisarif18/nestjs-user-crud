import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    // insert method return <InsertResult> data type and we would have to use save when immediate data is required in the frontend

    return await this.userRepo.insert(createUserDto);
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
    // console.log(name);
    return await this.userRepo.findOne({ where: { username } });
  }

  async changePassword(
    password: string,
    nickname: string,
    username: string,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.nickname !== nickname) {
      throw new NotFoundException('Nickname is incorrect');
    }

    user.password = password;
    return await this.userRepo.save(user);
  }
}
//UpdateResult and DeleteResult contains information about updation and deletion returned from typeOrm
//They were what I was previously seeing rows affected
//From there I can use .affected method to check how many rows affected
//Now I can display other message as boolean or whatever i specify in deletion and the updated object in updation
