import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Track name',
    type: 'string',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Link to Artist',
    type: 'string',
    required: true
  })
  artistId: string | null; // refers to Artist

  @ApiProperty({
    description: 'Link to Album',
    type: 'string',
    required: true
  })
  albumId: string | null; // refers to Album

  @IsInt()
  @ApiProperty({
    description: 'Track duration (sec)',
    type: 'string',
    required: true
  })
  duration: number; // integer number
}
