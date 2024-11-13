import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackDto } from '../dto/track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TrackStore {
  create: (trackDto: CreateTrackDto) => TrackEntity;
  update: (updateTrackDto: Partial<TrackDto>) => TrackEntity;
  delete: (id: string) => void;
  getAll: () => TrackEntity[];
  findById: (id: string) => TrackEntity | undefined;
}
