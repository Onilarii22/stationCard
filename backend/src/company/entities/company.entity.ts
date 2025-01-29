import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class Company {
  @ApiProperty()
  @IsString()
  name: string;
}
