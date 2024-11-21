import { FavoritesDto } from '../dto/favorites.dto';

export interface FavoritesStore {
  getAll: () => Promise<FavoritesDto>;
  addTrack: (id: string) => void;
  removeTrack: (id: string) => void;
  addAlbum: (id: string) => void;
  removeAlbum: (id: string) => void;
  addArtist: (id: string) => void;
  removeArtist: (id: string) => void;
}
