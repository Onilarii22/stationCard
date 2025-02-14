import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BeneficiaryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBeneficiaryDto) {
    const beneficiary = await this.findByEmail(data.email);
    if (beneficiary) throw new ConflictException('Beneficiary already exists!');

    return await this.prisma.beneficiary.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.beneficiary.findMany();
  }

  async findById(id: string) {
    const beneficiary = await this.prisma.beneficiary.findUnique({
      where: { id },
    });

    if (!beneficiary) throw new NotFoundException('Beneficiary not found!');

    return beneficiary;
  }

  async findByEmail(email: string) {
    const beneficiary = await this.prisma.beneficiary.findUnique({
      where: { email },
    });

    if (!beneficiary) throw new NotFoundException('Beneficiary not found!');

    return beneficiary;
  }

  async update(id: string, data: UpdateBeneficiaryDto) {
    const beneficiary = await this.findById(id);
    if (!beneficiary) throw new NotFoundException('Beneficiary not found!');
    return await this.prisma.beneficiary.update({ where: { id }, data });
  }

  async remove(id: string) {
    const beneficiary = await this.findById(id);
    if (!beneficiary) throw new NotFoundException('Beneficiary not found!');
    return await this.prisma.beneficiary.delete({ where: { id } });
  }
}
