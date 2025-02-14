import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MunicipalityService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMunicipalityDto) {
    const municipality = await this.findByName(data.name);

    if (municipality)
      throw new ConflictException(
        `La commune ${data.name} que vous essayez de créer existe déjà`,
      );

    return await this.prisma.municipality.create({ data });
  }

  async findAll(page: number = 1, take: number = 10) {
    const municipality = await this.prisma.municipality.findMany({
      skip: (page - 1) * take,
      take,
    });

    return { municipality, count: await this.prisma.municipality.count() };
  }

  async findOne(id: string) {
    const municipality = await this.prisma.municipality.findUnique({
      where: { id },
    });
    if (!municipality) throw new NotFoundException('Municipality not found');
    return municipality;
  }

  async findByName(name: string) {
    const municipality = await this.prisma.municipality.findUnique({
      where: { name },
    });
    if (!municipality) throw new NotFoundException('Municipality not found');
    return municipality;
  }

  async update(id: string, data: UpdateMunicipalityDto) {
    const municipality = await this.findOne(id);
    if (!municipality)
      throw new NotFoundException("This municipality doesn't exist!");
    return await this.prisma.municipality.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: string) {
    const municipality = await this.findOne(id);
    if (!municipality)
      throw new NotFoundException("This district doesn't exist!");
    return await this.prisma.municipality.delete({ where: { id } });
  }
}
