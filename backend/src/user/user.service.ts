import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (user) throw new ConflictException('User already exists!');

    return await this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, saltRounds),
      },
    });
  }

  async findAll(page: number = 1, take: number = 10) {
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * take,
      take,
    });

    return { users, count: await this.prisma.user.count() };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.prisma.user.delete({ where: { id } });
  }
}
