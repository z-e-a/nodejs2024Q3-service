import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackDto } from '../dto/track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TrackStore {
  create: (trackDto: CreateTrackDto) => Promise<TrackEntity>;
  update: (updateTrackDto: Partial<TrackDto>) => Promise<TrackEntity>;
  delete: (id: string) => void;
  getAll: () => Promise<TrackEntity[]>;
  findById: (id: string) => Promise<TrackEntity | undefined>;
}
