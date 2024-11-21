import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore } from './interfaces/track-storage.interface';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TrackStore')
    private readonly storage: TrackStore,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    return this.storage.create(createTrackDto);
  }

  findAll() {
    return this.storage.getAll();
  }

  async findOne(id: string) {
    return (await this.storage.findById(id)) as TrackDto;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.update({ id, ...updateTrackDto });
  }

  async remove(id: string) {
    await this.storage.delete(id);
  }

  async clearLinksToArtist(id: string) {
    (await this.storage.getAll()).forEach((track) => {
      if (track.artistId == id) {
        this.storage.update({ id: track.id, artistId: null });
      }
    });
  }

  async clearLinksToAlbum(id: string) {
    (await this.storage.getAll()).forEach((track) => {
      if (track.albumId == id) {
        this.storage.update({ id: track.id, albumId: null });
      }
    });
  }
}
