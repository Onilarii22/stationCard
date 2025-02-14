import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignIn } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignUp } from './dto/sign-up.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async signin(data: SignIn) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new NotFoundException('User not found!');

    if (!(await bcrypt.compare(data.password, user.password)))
      throw new BadRequestException('Email or Password is incorrect!');

    const token = `${nanoid(10)}+${user.id}`

    return `Welcome ${user.lastname}. Your token: ${token}`
  }

  async me(token: string){
    const id = token.slice(10)
    console.log("______ID_____:",id);
  }
}
