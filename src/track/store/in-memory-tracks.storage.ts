import { Injectable } from '@nestjs/common';
import { TrackStore } from '../interfaces/track-storage.interface';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { randomUUID } from 'crypto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
class InMemoryTracksStorage implements TrackStore {
  private records: TrackEntity[] = [];

  create(trackDto: CreateTrackDto): TrackEntity {
    const newTrack: TrackEntity = {
      ...trackDto,
      id: randomUUID(),
    };
    this.records.push(newTrack);
    return newTrack;
  }

  update(updateTrackDto: UpdateTrackDto): TrackEntity {
    this.records = this.records.map((track) => {
      if (track.id === updateTrackDto.id) {
        return Object.assign(track, updateTrackDto);
      }
      return track;
    });
    return this.findById(updateTrackDto.id);
  }

  delete(id: string): void {
    this.records = this.records.filter((record) => record.id !== id);
  }

  getAll(): TrackEntity[] {
    return this.records;
  }

  findById(id: string): TrackEntity | undefined {
    return this.records.find((record) => record.id == id);
  }
}

export default InMemoryTracksStorage;
