import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const user = await this.findByEmail(data.email);
    const saltRounds = 10;
    if (user) throw new ConflictException('Cet utilisateur existe déjà!');

    return await this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, saltRounds),
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
