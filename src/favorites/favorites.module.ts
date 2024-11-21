import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { PrismaService } from 'src/prisma.service';
import PostgresFavoritesStorage from './store/postgres-favorites.storage';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'FavoritesStore',
      useClass: PostgresFavoritesStorage,
    },
    PrismaService,
  ],
  exports: [FavoritesService],
  imports: [TrackModule, ArtistModule, AlbumModule],
})
export class FavoritesModule {}
