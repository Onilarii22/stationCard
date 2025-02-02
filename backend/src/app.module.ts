import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { PrismaService } from './prisma/prisma.service';
import { MunicipalityModule } from './municipality/municipality.module';
import { BaseLocationService } from './base-location/base-location.service';
import { BaseLocationController } from './base-location/base-location.controller';
import { DepartmentModule } from './department/department.module';
import { DistrictModule } from './district/district.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CityModule, MunicipalityModule, DepartmentModule, DistrictModule, AuthenticationModule, UserModule, CompanyModule],
  controllers: [AppController, BaseLocationController],
  providers: [AppService, PrismaService, BaseLocationService],
})
export class AppModule {}
