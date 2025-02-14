import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStationDto) {
    return await this.prisma.station.create({
      data,
    });
  }

  async findAll(page: number = 1, take: number = 10) {
    const station = await this.prisma.station.findMany({
      skip: (page - 1) * take,
      take,
    });

    return { station, count: await this.prisma.station.count() };
  }

  async findOne(id: string) {
    const station = await this.prisma.station.findUnique({
      where: { id },
    });

    if (!station) throw new NotFoundException('Station not found');

    return station;
  }

  async update(id: string, data: UpdateStationDto) {
    const station = await this.findOne(id);
    if (!station) throw new NotFoundException('Station not found');
    return await this.prisma.station.update({ where: { id }, data });
  }

  async remove(id: string) {
    const station = await this.findOne(id);
    if (!station) throw new NotFoundException('Station not found');
    return await this.prisma.station.delete({ where: { id } });
  }
}
