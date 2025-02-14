import { Module } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryController } from './beneficiary.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BeneficiaryController],
  providers: [BeneficiaryService, PrismaService],
})
export class BeneficiaryModule {}
