import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore } from './interfaces/artist-storage.interface';
import { ArtistDto } from './dto/artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistStore')
    private readonly storage: ArtistStore,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.storage.create(createArtistDto);
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string) {
    return this.storage.findById(id) as ArtistDto;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.update({ id, ...updateArtistDto });
  }

  remove(id: string) {
    this.trackService.clearLinksToArtist(id);
    this.albumService.clearLinksToArtist(id);
    this.storage.delete(id);
  }
}
