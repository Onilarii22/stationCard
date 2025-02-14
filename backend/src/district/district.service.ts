import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DistrictService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDistrictDto) {
    const city = await this.findByName(data.name);

    if (city)
      throw new ConflictException(
        `Le quartier ${data.name} que vous essayez de créer existe déjà`,
      );

    return await this.prisma.district.create({ data });
  }

  async findAll(page: number = 1, take: number = 10) {
    const district = await this.prisma.district.findMany({
      skip: (page - 1) * take,
      take,
    });

    return { district, count: await this.prisma.district.count() };
  }

  async findByName(name: string) {
    const district = await this.prisma.district.findUnique({
      where: { name },
    });

    if (!district) throw new NotFoundException('District not found!');

    return district;
  }

  async findById(id: string) {
    const district = await this.prisma.district.findUnique({ where: { id } });

    if (!district) throw new NotFoundException('District not found!');

    return district;
  }

  async update(id: string, data: UpdateDistrictDto) {
    const district = await this.findById(id);
    if (!district) throw new NotFoundException("This district doesn't exist!");
    return await this.prisma.district.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const district = await this.findById(id);
    if (!district) throw new NotFoundException("This district doesn't exist!");
    return await this.prisma.district.delete({ where: { id } });
  }
}
