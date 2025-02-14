import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    const company = await this.findByName(data.name);
    if (company) throw new ConflictException(`${data.name} already exists!`);

    return await this.prisma.company.create({ data });
  }

  async findAll() {
    return await this.prisma.company.findMany();
  }

  async findById(id: string) {
    const company = await this.prisma.company.findUnique({ where: { id } });

    if (!company) throw new NotFoundException('Company not found!');

    return company;
  }

  async findByName(name: string) {
    const company = await this.prisma.company.findUnique({ where: { name } });

    if (!company) throw new NotFoundException('Company not found!');

    return company;
  }

  async update(id: string, data: UpdateCompanyDto) {
    const company = await this.findById(id);
    if (!company) throw new NotFoundException('Company not found!');
    return await this.prisma.company.update({ where: { id }, data });
  }

  async remove(id: string) {
    const company = await this.findById(id);
    if (!company) throw new NotFoundException('Company not found!');
    return await this.prisma.company.delete({ where: { id } });
  }
}
