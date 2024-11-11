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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { validate as validateUuid } from 'uuid';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.checkId(id);
    const track = this.checkTrack(id);
    return track;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    this.checkId(id);
    this.checkTrack(id);
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.checkId(id);
    this.checkTrack(id);
    return this.trackService.remove(id);
  }

  checkId(id: string) {
    if (!validateUuid(id)) {
      throw new HttpException(
        `Track id: ${id} is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  checkTrack(id: string): TrackDto {
    const track: TrackDto = this.trackService.findOne(id);
    if (!track) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }
}
