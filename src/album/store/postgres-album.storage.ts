import { Injectable } from '@nestjs/common';
import { AlbumStore } from '../interfaces/album-storage.interface';
import { AlbumEntity } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
class PostgresAlbumsStorage implements AlbumStore {
  constructor(private readonly prisma: PrismaService) {}

  async create(albumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum: AlbumEntity = await this.prisma.album.create({
      data: albumDto,
    });
    return newAlbum;
  }

  async update(updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    return await this.prisma.album.update({
      where: { id: updateAlbumDto.id },
      data: updateAlbumDto,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.album.delete({
      where: { id },
    });
  }

  async getAll(): Promise<AlbumEntity[]> {
    return await this.prisma.album.findMany();
  }

  async findById(id: string): Promise<AlbumEntity | undefined> {
    return await this.prisma.album.findUnique({
      where: { id },
    });
  }
}

export default PostgresAlbumsStorage;
