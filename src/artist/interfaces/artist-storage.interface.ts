import { CreateArtistDto } from '../dto/create-artist.dto';
import { ArtistDto } from '../dto/artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStore {
  create: (artistDto: CreateArtistDto) => ArtistEntity;
  update: (updateArtistDto: Partial<ArtistDto>) => ArtistEntity;
  delete: (id: string) => void;
  getAll: () => ArtistEntity[];
  findById: (id: string) => ArtistEntity | undefined;  
}
