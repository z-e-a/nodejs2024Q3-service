import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsUUID } from 'class-validator';

export class UserDto extends CreateUserDto {
  @IsUUID()
  @ApiProperty()
  id: string; // uuid v4

  @IsInt()
  version: number; // integer number, increments on update

  createdAt: number; // timestamp of creation

  updatedAt: number; // timestamp of last update
}
