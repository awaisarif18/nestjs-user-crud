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
    return await this.messageRepo.insert(createMessageDto);
  }

  async findAll(): Promise<ContactEntity[]> {
    return await this.messageRepo.find({});
  }

  async findOne(id: number): Promise<ContactEntity> {
    return await this.messageRepo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.messageRepo.delete(id);
  }
}
