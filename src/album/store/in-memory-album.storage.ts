import { Injectable } from '@nestjs/common';
import { AlbumStore } from '../interfaces/album-storage.interface';
import { AlbumEntity } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { randomUUID } from 'crypto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
class InMemoryAlbumsStorage implements AlbumStore {
  private records: AlbumEntity[] = [];

  create(albumDto: CreateAlbumDto): AlbumEntity {
    const newAlbum: AlbumEntity = {
      ...albumDto,
      id: randomUUID(),
    };
    this.records.push(newAlbum);
    return newAlbum;
  }

  update(updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    this.records = this.records.map((Album) => {
      if (Album.id === updateAlbumDto.id) {
        return Object.assign(Album, updateAlbumDto);
      }
      return Album;
    });
    return this.findById(updateAlbumDto.id);
  }

  delete(id: string): void {
    this.records = this.records.filter((record) => record.id !== id);
  }

  getAll(): AlbumEntity[] {
    return this.records;
  }

  findById(id: string): AlbumEntity | undefined {
    return this.records.find((record) => record.id == id);
  }
}

export default InMemoryAlbumsStorage;
