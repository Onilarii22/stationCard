import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseLocationService } from './base-location.service';
import { UpdateCityDto } from 'src/city/dto/update-city.dto';
import { PaginationDto } from 'src/city/dto/create-city.dto';

@Controller('base-location')
export class BaseLocationController {
  constructor(private readonly baseLocation: BaseLocationService) {}

  @Post()
  create<T>(@Body() createCityDto: T) {
    return this.baseLocation.create(createCityDto);
  }

  @Get()
  findAll(@Query('args') args: PaginationDto) {
    return this.baseLocation.findAll(args);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseLocation.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.baseLocation.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseLocation.remove(id);
  }
}
