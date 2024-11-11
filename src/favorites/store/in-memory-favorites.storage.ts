import { Injectable } from '@nestjs/common';
import { FavoritesStore } from '../interfaces/favorites-storage.interface';

@Injectable()
class InMemoryFavoritesStorage implements FavoritesStore {
  private artists: string[] = []; // favorite artists ids
  private albums: string[] = []; // favorite albums ids
  private tracks: string[] = []; // favorite tracks ids

  getAll() {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  addTrack(id: string) {
    this.tracks.push(id);
  }

  removeTrack(id: string) {
    this.tracks = this.tracks.filter((trackId) => trackId !== id);
  }

  addAlbum(id: string) {
    this.albums.push(id);
  }

  removeAlbum(id: string) {
    this.albums = this.albums.filter((albumId) => albumId !== id);
  }

  addArtist(id: string) {
    this.artists.push(id);
  }

  removeArtist(id: string) {
    this.artists = this.artists.filter((artistId) => artistId !== id);
  }
}

export default InMemoryFavoritesStorage;
