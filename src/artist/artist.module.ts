import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
// import InMemoryArtistsStorage from './store/in-memory-artist.storage';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { PrismaService } from 'src/prisma.service';
import PostgresArtistsStorage from './store/postgres-artist.storage';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistsStorage,
    },
    PrismaService,
  ],
  exports: [ArtistService],
  imports: [TrackModule, AlbumModule],
})
export class ArtistModule {}
