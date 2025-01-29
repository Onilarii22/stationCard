import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MunicipalityService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMunicipalityDto) {
    const city = await this.prisma.municipality.findUnique({
      where: { name: data.name },
    });

    if (city)
      throw new ConflictException(
        `La commune ${data.name} que vous essayez de créer existe déjà`,
      );

    return await this.prisma.municipality.create({ data });
  }

  async findAll() {
    // const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.municipality.findMany({
      // skip,
      // take,
      // cursor,
      // where,
      // orderBy,
    });
  }

  async findOne(id: string) {
    return await this.prisma.municipality.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateMunicipalityDto) {
    return await this.prisma.municipality.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: string) {
    return await this.prisma.municipality.delete({ where: { id } });
  }
}
