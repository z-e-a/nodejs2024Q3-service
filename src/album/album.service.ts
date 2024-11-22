import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStore } from './interfaces/album-storage.interface';
import { AlbumDto } from './dto/album.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumStore')
    private readonly storage: AlbumStore,
    private readonly trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create(createAlbumDto);
  }

  findAll() {
    return this.storage.getAll();
  }

  async findOne(id: string) {
    return (await this.storage.findById(id)) as unknown as AlbumDto;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.update({ id, ...updateAlbumDto });
  }

  async remove(id: string) {
    this.trackService.clearLinksToAlbum(id);
    await this.storage.delete(id);
  }

  async clearLinksToArtist(id: string) {
    (await this.storage.getAll()).forEach((album) => {
      if (album.artistId == id) {
        this.storage.update({ id: album.id, artistId: null });
      }
    });
  }
}
