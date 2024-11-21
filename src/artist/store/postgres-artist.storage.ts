import { Injectable } from '@nestjs/common';
import { ArtistStore } from '../interfaces/artist-storage.interface';
import { ArtistEntity } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
class PostgresArtistsStorage implements ArtistStore {
  constructor(private readonly prisma: PrismaService) {}

  async create(artistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist: ArtistEntity = await this.prisma.artist.create({
      data: artistDto,
    });
    return newArtist;
  }

  async update(updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    return await this.prisma.artist.update({
      where: { id: updateArtistDto.id },
      data: updateArtistDto,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.artist.delete({
      where: { id },
    });
  }

  async getAll(): Promise<ArtistEntity[]> {
    return await this.prisma.artist.findMany();
  }

  async findById(id: string): Promise<ArtistEntity | undefined> {
    return await this.prisma.artist.findUnique({
      where: { id },
    });
  }
}

export default PostgresArtistsStorage;
