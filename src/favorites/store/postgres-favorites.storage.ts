import { Injectable } from '@nestjs/common';
import { FavoritesStore } from '../interfaces/favorites-storage.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
class PostgresFavoritesStorage implements FavoritesStore {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const artists = await this.prisma.artist.findMany({
      where: { inFavorites: true },
    });
    const albums = await this.prisma.album.findMany({
      where: { inFavorites: true },
    });
    const tracks = await this.prisma.track.findMany({
      where: { inFavorites: true },
    });
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string) {
    await this.prisma.track.update({
      where: { id },
      data: { inFavorites: true },
    });
  }

  async removeTrack(id: string) {
    await this.prisma.track.update({
      where: { id },
      data: { inFavorites: false },
    });
  }

  async addAlbum(id: string) {
    await this.prisma.album.update({
      where: { id },
      data: { inFavorites: true },
    });
  }

  async removeAlbum(id: string) {
    await this.prisma.album.update({
      where: { id },
      data: { inFavorites: false },
    });
  }

  async addArtist(id: string) {
    await this.prisma.artist.update({
      where: { id },
      data: { inFavorites: true },
    });
  }

  async removeArtist(id: string) {
    await this.prisma.artist.update({
      where: { id },
      data: { inFavorites: false },
    });
  }
}

export default PostgresFavoritesStorage;
