import { Prisma } from "@prisma/client";
import { City } from "../entities/city.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateCityDto extends City {}


export class PaginationDto extends City {
    @ApiProperty() 
    @IsNumber()
    @IsOptional()
    skip?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    take?: number;

    @ApiProperty()
    cursor?: Prisma.CityWhereUniqueInput;

    @ApiProperty()
    where?: Prisma.CityWhereInput;

    @ApiProperty()
    orderBy?: Prisma.CityOrderByWithRelationInput;    
}
