import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCityDto, PaginationDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { City } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCityDto) {
    const city = await this.prisma.city.findUnique({
      where: { name: data.name },
    });

    if (city)
      throw new ConflictException(
        `La ville ${data.name} que vous essayez de créer existe déjà`,
      );

    return await this.prisma.city.create({ data });
  }

  async findAll(params?: PaginationDto): Promise<City[]> {
    // const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.city.findMany({
      // skip,
      // take,
      // cursor,
      // where,
      // orderBy,
    });
  }

  async findById(id: string) {
    return await this.prisma.city.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.city.findUnique({ where: { name } });
  }

  async update(id: string, data: UpdateCityDto) {
    return await this.prisma.city.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: string) {
    return await this.prisma.city.delete({ where: { id } });
  }
}
