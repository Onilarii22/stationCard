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

@Module({
  imports: [CityModule, MunicipalityModule, DepartmentModule, DistrictModule],
  controllers: [AppController, BaseLocationController],
  providers: [AppService, PrismaService, BaseLocationService],
})
export class AppModule {}
