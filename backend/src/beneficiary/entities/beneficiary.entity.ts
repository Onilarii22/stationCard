import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class Beneficiary {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  availableTotalAmount: number;

  @ApiProperty()
  @IsNumber()
  remainingAmount: number;

  @ApiProperty()
  @IsNumber()
  expense: number;

  @ApiProperty()
  @IsString()
  companyId: string;
}
