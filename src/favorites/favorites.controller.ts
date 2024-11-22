import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate as validateUuid } from 'uuid';
import { AlbumService } from 'src/album/album.service';
import { AlbumDto } from 'src/album/dto/album.dto';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { TrackDto } from 'src/track/dto/track.dto';
import { ArtistDto } from 'src/artist/dto/artist.dto';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    this.checkId(id);
    await this.checkTrack(id);
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param('id') id: string) {
    this.checkId(id);
    await this.favoritesService.removeTrack(id);
  }

  @Post('/album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    this.checkId(id);
    await this.checkAlbum(id);
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param('id') id: string) {
    this.checkId(id);
    await this.favoritesService.removeAlbum(id);
  }

  @Post('/artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    this.checkId(id);
    await this.checkArtist(id);
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(@Param('id') id: string) {
    this.checkId(id);
    await this.favoritesService.removeArtist(id);
  }

  checkId(id: string) {
    if (!validateUuid(id)) {
      throw new HttpException(
        `Track id: ${id} is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkAlbum(id: string) {
    const album: AlbumDto = await this.albumService.findOne(id);
    if (!album) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return album;
  }

  async checkArtist(id: string) {
    const artist: ArtistDto = await this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return artist;
  }

  async checkTrack(id: string): Promise<TrackDto> {
    const track: TrackDto = await this.trackService.findOne(id);
    if (!track) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return track;
  }
}
