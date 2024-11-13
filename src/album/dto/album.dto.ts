import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class AlbumDto extends CreateAlbumDto {
  @IsUUID()
  @ApiProperty()
  id: string; // uuid v4
}
