import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDepartmentDto) {
    const department = await this.prisma.department.findUnique({
      where: { name: data.name },
    });

    if (department)
      throw new ConflictException(
        `Le département ${data.name} que vous essayez de créer existe déjà`,
      );

    return await this.prisma.department.create({ data });
  }

  async findAll() {
    return this.prisma.department.findMany({});
  }

  async findById(id: string) {
    return await this.prisma.department.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.department.findUnique({ where: { name } });
  }

  async update(id: string, data: UpdateDepartmentDto) {
    return await this.prisma.department.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: string) {
    return await this.prisma.department.delete({ where: { id } });
  }
}
