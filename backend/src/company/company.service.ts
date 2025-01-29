import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    const company = await this.findByName(data.name);
    if (company)
      throw new ConflictException(`L'entreprise ${data.name} existe déjà`);

    return await this.prisma.company.create({ data });
  }

  async findAll() {
    return await this.prisma.company.findMany();
  }

  async findById(id: string) {
    return await this.prisma.company.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.company.findUnique({ where: { name } });
  }

  async update(id: string, data: UpdateCompanyDto) {
    return await this.prisma.company.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.company.delete({ where: { id } });
  }
}
