import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import InMemoryAlbumsStorage from './store/in-memory-album.storage';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService,
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumsStorage,
    },],
})
export class AlbumModule {}
