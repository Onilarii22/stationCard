import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class District {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  cityId: string;
}
