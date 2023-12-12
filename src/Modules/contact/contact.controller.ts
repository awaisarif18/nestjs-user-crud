import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateMessageDto } from 'src/dto/contact/create-message.dto';
import { DeleteResult, InsertResult } from 'typeorm';
import { ContactEntity } from '../entities/contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<InsertResult> {
    try {
      console.log('Received contact request:', createMessageDto);
      const result = await this.contactService.create(createMessageDto);
      console.log('Contact created successfully:', result);
      return result;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<ContactEntity[]> {
    return await this.contactService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ContactEntity> {
    return await this.contactService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.contactService.remove(id);
  }
}
