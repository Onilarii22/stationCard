import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class City {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  cityId: string;
}
