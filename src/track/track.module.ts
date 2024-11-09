import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import InMemoryTracksStorage from './store/in-memory-tracks.storage';

@Module({
  controllers: [TrackController],
  providers: [TrackService,
    {
      provide: 'TrackStore',
      useClass: InMemoryTracksStorage,
    },],
})
export class TrackModule {}
