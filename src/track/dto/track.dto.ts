import { IsUUID } from 'class-validator';
import { CreateTrackDto } from './create-track.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TrackDto extends CreateTrackDto {
  @IsUUID()
  @ApiProperty()
  id: string; // uuid v4
}
