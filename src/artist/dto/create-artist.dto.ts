import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Artist name',
    type: 'string',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Is artist has grammy award?',
    type: 'string',
    required: true,
  })
  grammy: boolean;
}
