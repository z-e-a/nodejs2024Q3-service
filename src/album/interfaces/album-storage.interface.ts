import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumDto } from '../dto/album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumStore {
  create: (AlbumDto: CreateAlbumDto) => Promise<AlbumEntity>;
  update: (updateAlbumDto: Partial<AlbumDto>) => Promise<AlbumEntity>;
  delete: (id: string) => void;
  getAll: () => Promise<AlbumEntity[]>;
  findById: (id: string) => Promise<AlbumEntity | undefined>;
}
