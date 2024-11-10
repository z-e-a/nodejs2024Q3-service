import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, HttpCode } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AlbumDto } from './dto/album.dto';
import { validate as validateUuid } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.checkId(id);
    const album = this.checkAlbum(id);
    return album;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    this.checkId(id);
    this.checkAlbum(id);
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.checkId(id);
    this.checkAlbum(id);
    return this.albumService.remove(id);
  }

  checkId(id: string) {
    if (!validateUuid(id)) {
      throw new HttpException(
        `Album id: ${id} is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  checkAlbum(id: string): AlbumDto {
    const album: AlbumDto = this.albumService.findOne(id);
    if (!album) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }
}
