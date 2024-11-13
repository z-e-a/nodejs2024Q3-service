import { PartialType } from '@nestjs/swagger';
import { ArtistDto } from './artist.dto';

export class UpdateArtistDto extends PartialType(ArtistDto) {}
