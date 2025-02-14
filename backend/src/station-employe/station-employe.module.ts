import { Module } from '@nestjs/common';
import { StationEmployeService } from './station-employe.service';
import { StationEmployeController } from './station-employe.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StationEmployeController],
  providers: [StationEmployeService,PrismaService],
})
export class StationEmployeModule {}
