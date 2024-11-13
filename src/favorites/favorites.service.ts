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

  findAll() {
    let ids = this.storage.getAll();
    ids.albums.forEach((albumId) => {
      const album = this.albumService.findOne(albumId);
      if (!album) {
        this.storage.removeAlbum(albumId);
      }
    });
    ids.artists.forEach((artistId) => {
      const artist = this.artistService.findOne(artistId);
      if (!artist) {
        this.storage.removeArtist(artistId);
      }
    });
    ids.tracks.forEach((trackId) => {
      const track = this.trackService.findOne(trackId);
      if (!track) {
        this.storage.removeTrack(trackId);
      }
    });

    ids = this.storage.getAll();
    return {
      artists: ids.artists.map((artistId) =>
        this.artistService.findOne(artistId),
      ),
      albums: ids.albums.map((albumId) => this.albumService.findOne(albumId)),
      tracks: ids.tracks.map((trackId) => this.trackService.findOne(trackId)),
    };
  }

  addTrack(id: string) {
    return this.storage.addTrack(id);
  }

  removeTrack(id: string) {
    this.storage.removeTrack(id);
  }

  addAlbum(id: string) {
    return this.storage.addAlbum(id);
  }

  removeAlbum(id: string) {
    this.storage.removeAlbum(id);
  }

  addArtist(id: string) {
    return this.storage.addArtist(id);
  }

  removeArtist(id: string) {
    this.storage.removeArtist(id);
  }
}
