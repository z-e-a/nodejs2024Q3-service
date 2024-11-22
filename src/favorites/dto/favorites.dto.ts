import { Album, Artist, Track } from '@prisma/client';

export class FavoritesDto {
  artists: Artist[]; // favorite artists
  albums: Album[]; // favorite albums
  tracks: Track[]; // favorite tracks
}
