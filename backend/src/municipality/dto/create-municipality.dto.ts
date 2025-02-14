import { Type } from 'class-transformer';
import { Municipality } from '../entities/municipality.entity';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMunicipalityDto extends Municipality {}

export class PaginationDto {
    @ApiProperty()
    @IsNumber()
  skip: number;
  take: number;
  where: string;
  orderBy: string;
}
