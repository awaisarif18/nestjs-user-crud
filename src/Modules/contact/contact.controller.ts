import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateMessageDto } from 'src/dto/contact/create-message.dto';
import { DeleteResult, InsertResult } from 'typeorm';
import { ContactEntity } from '../entities/contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  //localhost:3000/contact
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
  //localhost:3000/contact
  async findAll(): Promise<ContactEntity[]> {
    try {
      console.log('Received messages fetch request');
      return await this.contactService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  //localhost:3000/contact/id
  async findOne(@Param('id') id: number): Promise<ContactEntity> {
    try {
      console.log('Received message fetch request');
      return await this.contactService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  //localhost:3000/contact/id
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    try {
      console.log('Received message delete request');
      return await this.contactService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
