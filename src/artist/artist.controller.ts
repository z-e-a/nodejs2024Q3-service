import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate as validateUuid } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.checkId(id);
    const artist = this.checkArtist(id);
    return artist;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    this.checkId(id);
    this.checkArtist(id);
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.checkId(id);
    this.checkArtist(id);
    return this.artistService.remove(id);
  }

  checkId(id: string) {
    if (!validateUuid(id)) {
      throw new HttpException(
        `Artist id: ${id} is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  checkArtist(id: string): ArtistDto {
    const artist: ArtistDto = this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }
}
