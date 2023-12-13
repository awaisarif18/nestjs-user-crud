/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMessageDto {
  @Length(7, 30)
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Length(3, 30)
  @IsNotEmpty()
  @IsString()
  subject!: string;

  @Length(3, 255)
  @IsNotEmpty()
  @IsString()
  message!: string;
}
