import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'User name',
    type: 'string',
    required: true
  })
  login: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User name',
    type: 'string',
    required: true
  })
  password: string;
}
