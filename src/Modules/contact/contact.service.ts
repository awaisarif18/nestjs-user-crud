import { CreateMessageDto } from '../../dto/contact/create-message.dto';
import { Injectable } from '@nestjs/common';
import { ContactEntity } from '../entities/contact.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly messageRepo: Repository<ContactEntity>,
  ) {}
  async create(createMessageDto: CreateMessageDto): Promise<InsertResult> {
    try {
      return await this.messageRepo.insert(createMessageDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ContactEntity[]> {
    try {
      return await this.messageRepo.find({});
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ContactEntity> {
    try {
      return await this.messageRepo.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.messageRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
