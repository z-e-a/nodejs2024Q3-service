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
  addTrackToFavorites(@Param('id') id: string) {
    this.checkId(id);
    this.checkTrack(id);
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id') id: string) {
    this.checkId(id);
    this.favoritesService.removeTrack(id);
  }

  @Post('/album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    this.checkId(id);
    this.checkAlbum(id);
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id') id: string) {
    this.checkId(id);
    this.favoritesService.removeAlbum(id);
  }

  @Post('/artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    this.checkId(id);
    this.checkArtist(id);
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id') id: string) {
    this.checkId(id);
    this.favoritesService.removeArtist(id);
  }

  checkId(id: string) {
    if (!validateUuid(id)) {
      throw new HttpException(
        `Track id: ${id} is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  checkAlbum(id: string) {
    const album: AlbumDto = this.albumService.findOne(id);
    if (!album) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return album;
  }

  checkArtist(id: string) {
    const artist: ArtistDto = this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return artist;
  }

  checkTrack(id: string): TrackDto {
    const track: TrackDto = this.trackService.findOne(id);
    if (!track) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return track;
  }
}
