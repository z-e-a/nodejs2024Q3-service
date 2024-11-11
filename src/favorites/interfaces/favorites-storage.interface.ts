export interface FavoritesStore {
  getAll: () => { artists: string[]; albums: string[]; tracks: string[] };
  addTrack: (id: string) => void;
  removeTrack: (id: string) => void;
  addAlbum: (id: string) => void;
  removeAlbum: (id: string) => void;
  addArtist: (id: string) => void;
  removeArtist: (id: string) => void;
}
