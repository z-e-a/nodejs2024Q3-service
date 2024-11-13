import { Injectable } from '@nestjs/common';
import { ArtistStore } from '../interfaces/artist-storage.interface';
import { ArtistEntity } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { randomUUID } from 'crypto';
import { UpdateArtistDto } from '../dto/update-Artist.dto';

@Injectable()
class InMemoryArtistsStorage implements ArtistStore {
  private records: ArtistEntity[] = [];

  create(artistDto: CreateArtistDto): ArtistEntity {
    const newArtist: ArtistEntity = {
      ...artistDto,
      id: randomUUID(),
    };
    this.records.push(newArtist);
    return newArtist;
  }

  update(updateArtistDto: UpdateArtistDto): ArtistEntity {
    this.records = this.records.map((Artist) => {
      if (Artist.id === updateArtistDto.id) {
        return Object.assign(Artist, updateArtistDto);
      }
      return Artist;
    });
    return this.findById(updateArtistDto.id);
  }

  delete(id: string): void {
    this.records = this.records.filter((record) => record.id !== id);
  }

  getAll(): ArtistEntity[] {
    return this.records;
  }

  findById(id: string): ArtistEntity | undefined {
    return this.records.find((record) => record.id == id);
  }
}

export default InMemoryArtistsStorage;
