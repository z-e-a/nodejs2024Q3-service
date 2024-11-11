import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumDto } from '../dto/album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumStore {
  create: (AlbumDto: CreateAlbumDto) => AlbumEntity;
  update: (updateAlbumDto: Partial<AlbumDto>) => AlbumEntity;
  delete: (id: string) => void;
  getAll: () => AlbumEntity[];
  findById: (id: string) => AlbumEntity | undefined;
}
