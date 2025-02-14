import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  async create(@Body() createStationDto: CreateStationDto) {
    return await this.stationService.create(createStationDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('take') take: number = 10,
  ) {
    const items = await this.stationService.findAll(page, take)
    const totalPages = items.count;
    return {
      data: items.station,
      pagination: {
        currentPage: page,
        totalItems: items.count,
        totalPages,
        itemsPerPage: take,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.stationService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return await this.stationService.update(id, updateStationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.stationService.remove(id);
  }
}
