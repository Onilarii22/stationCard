import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MunicipalityModule } from './municipality/municipality.module';
import { DepartmentModule } from './department/department.module';
import { DistrictModule } from './district/district.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { StationEmployeModule } from './station-employe/station-employe.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';
import { StationModule } from './station/station.module';

@Module({
  imports: [
    MunicipalityModule,
    DepartmentModule,
    DistrictModule,
    AuthenticationModule,
    UserModule,
    CompanyModule,
    StationEmployeModule,
    BeneficiaryModule,
    StationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
