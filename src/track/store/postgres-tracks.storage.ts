import { Injectable } from '@nestjs/common';
import { TrackStore } from '../interfaces/track-storage.interface';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
class PostgresTracksStorage implements TrackStore {
  constructor(private readonly prisma: PrismaService) {}

  async create(trackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack: TrackEntity = await this.prisma.track.create({
      data: trackDto,
    });
    return newTrack;
  }

  async update(updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
    return await this.prisma.track.update({
      where: { id: updateTrackDto.id },
      data: updateTrackDto,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.track.delete({
      where: { id },
    });
  }

  async getAll(): Promise<TrackEntity[]> {
    return await this.prisma.track.findMany();
  }

  async findById(id: string): Promise<TrackEntity | undefined> {
    return await this.prisma.track.findUnique({
      where: { id },
    });
  }
}

export default PostgresTracksStorage;
