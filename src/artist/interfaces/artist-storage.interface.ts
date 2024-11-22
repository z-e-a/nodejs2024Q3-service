import { CreateArtistDto } from '../dto/create-artist.dto';
import { ArtistDto } from '../dto/artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStore {
  create: (artistDto: CreateArtistDto) => Promise<ArtistEntity>;
  update: (updateArtistDto: Partial<ArtistDto>) => Promise<ArtistEntity>;
  delete: (id: string) => void;
  getAll: () => Promise<ArtistEntity[]>;
  findById: (id: string) => Promise<ArtistEntity | undefined>;
}
