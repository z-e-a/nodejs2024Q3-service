import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { PrismaService } from 'src/prisma.service';
import PostgresAlbumsStorage from './store/postgres-album.storage';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: PostgresAlbumsStorage,
    },
    PrismaService,
  ],
  exports: [AlbumService],
  imports: [TrackModule],
})
export class AlbumModule {}
