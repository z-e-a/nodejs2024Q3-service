/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { FavoritesStore } from './interfaces/favorites-storage.interface';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FavoritesStore')
    private readonly storage: FavoritesStore,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  async findAll() {
    const favorites = await this.storage.getAll();
    return {
      artists: favorites.artists.map(({ inFavorites, ...entity }) => entity),
      albums: favorites.albums.map(({ inFavorites, ...entity }) => entity),
      tracks: favorites.tracks.map(({ inFavorites, ...entity }) => entity),
    };
  }

  addTrack(id: string) {
    return this.storage.addTrack(id);
  }

  async removeTrack(id: string) {
    await this.storage.removeTrack(id);
  }

  addAlbum(id: string) {
    return this.storage.addAlbum(id);
  }

  async removeAlbum(id: string) {
    await this.storage.removeAlbum(id);
  }

  addArtist(id: string) {
    return this.storage.addArtist(id);
  }

  async removeArtist(id: string) {
    await this.storage.removeArtist(id);
  }
}
