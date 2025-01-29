import { ConflictException, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/city/dto/create-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BaseLocationService {
  private model: any;

  constructor(private prisma: PrismaService) {}

  setModel(name: string) {
    this.model = this.prisma[name];
  }

  async create<T>(data: T) {
    return await this.model.create({ data });
  }

  async findAll<T>(params: PaginationDto): Promise<T[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: string) {
    return await this.prisma.city.findUnique({ where: { id } });
  }

  async update<T>(id: string, data: T) {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.model.delete({ where: { id } });
  }
}
