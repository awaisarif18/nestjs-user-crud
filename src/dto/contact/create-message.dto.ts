/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMessageDto {
  @Length(7, 30)
  @IsNotEmpty()
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
