import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import InMemoryArtistsStorage from './store/in-memory-artist.storage';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService,
    {
      provide: 'ArtistStore',
      useClass: InMemoryArtistsStorage,
    },],
})
export class ArtistModule {}
