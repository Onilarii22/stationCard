import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(take: number = 10, page: number = 1) {
    const departements = await this.prisma.department.findMany({
      skip: (page - 1) * take,
      take,
    });
    return {departements, count: await this.prisma.department.count()};
  }

  async findById(id: string) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) throw new NotFoundException('Department not found!');
    return department;
  }

  async findByName(name: string) {
    const department = await this.prisma.department.findUnique({
      where: { name },
    });
    if (!department) throw new NotFoundException('Department not found!');
    return department;
  }

  async update(id: string, data: UpdateDepartmentDto) {
    const department = await this.findById(id);
    if (!department)
      throw new NotFoundException("This department doesn't exist!");
    return await this.prisma.department.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: string) {
    const department = await this.findById(id);
    if (!department)
      throw new NotFoundException("This department doesn't exist!");
    return await this.prisma.department.delete({ where: { id } });
  }
}
