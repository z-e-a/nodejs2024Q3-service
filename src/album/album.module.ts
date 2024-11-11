import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import InMemoryAlbumsStorage from './store/in-memory-album.storage';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumsStorage,
    },
  ],
  exports: [AlbumService],
  imports: [TrackModule],
})
export class AlbumModule {}
