import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStationEmployeDto } from './dto/create-station-employe.dto';
import { UpdateStationEmployeDto } from './dto/update-station-employe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StationEmployeService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStationEmployeDto) {
    const user = await this.findByEmail(data.email);
    const saltRounds = 10;
    if (user) throw new ConflictException('Cet employe existe déjà!');

    return await this.prisma.stationEmploye.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, saltRounds),
      },
    });
  }

  async findAll(page: number = 1, take: number = 10) {
    const stationEmploye = await this.prisma.stationEmploye.findMany({
      skip: (page - 1) * take,
      take,
    });

    return { stationEmploye, count: await this.prisma.stationEmploye.count() };
  }

  async findById(id: string) {
    const employe = await this.prisma.stationEmploye.findUnique({
      where: { id },
    });

    if (!employe) throw new NotFoundException("This employe doesn't exist");

    return employe;
  }

  async findByEmail(email: string) {
    const employe = await this.prisma.stationEmploye.findUnique({
      where: { email },
    });

    if (!employe) throw new NotFoundException("This employe doesn't exist");

    return employe;
  }

  async update(id: string, data: UpdateStationEmployeDto) {
    const employe = await this.findById(id);
    if (!employe) throw new NotFoundException("This employe doesn't exist!");
    return await this.prisma.stationEmploye.update({ where: { id }, data });
  }

  async remove(id: string) {
    const employe = await this.findById(id);
    if (!employe) throw new NotFoundException("This employe doesn't exist!");
    return await this.prisma.stationEmploye.delete({ where: { id } });
  }
}
