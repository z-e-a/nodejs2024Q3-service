import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaService } from 'src/prisma.service';
import PostgresTracksStorage from './store/postgres-tracks.storage';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackStore',
      useClass: PostgresTracksStorage,
    },
    PrismaService,
  ],
  exports: [TrackService],
})
export class TrackModule {}
