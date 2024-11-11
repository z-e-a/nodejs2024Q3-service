import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Album name',
    type: 'string',
    required: true,
  })
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Album year',
    type: 'number',
    required: true,
  })
  year: number;

  @ApiProperty({
    description: 'Link to Artist',
    type: 'string',
    required: true,
  })
  artistId: string | null; // refers to Artist
}
