import { IsUUID } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistDto extends CreateArtistDto {
  @IsUUID()
  @ApiProperty()
  id: string; // uuid v4
}
