import { PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';
import { AlbumDto } from './album.dto';

export class UpdateAlbumDto extends PartialType(AlbumDto) {}
