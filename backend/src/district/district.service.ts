import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DistrictService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDistrictDto) {
    const city = await this.prisma.district.findUnique({
      where: { name: data.name },
    });

    if (city)
      throw new ConflictException(
        `Le quartier ${data.name} que vous essayez de créer existe déjà`,
      );

    return await this.prisma.district.create({ data });
  }

  async findAll() {
    return this.prisma.district.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.district.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateDistrictDto) {
    return await this.prisma.district.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: string) {
    return await this.prisma.municipality.delete({ where: { id } });
  }
}
