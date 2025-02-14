import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StationEmployeService } from './station-employe.service';
import { CreateStationEmployeDto } from './dto/create-station-employe.dto';
import { UpdateStationEmployeDto } from './dto/update-station-employe.dto';

@Controller('station-employe')
export class StationEmployeController {
  constructor(private readonly stationEmployeService: StationEmployeService) {}

  @Post()
  async create(@Body() createStationEmployeDto: CreateStationEmployeDto) {
    return await this.stationEmployeService.create(createStationEmployeDto);
  }

  @Get()
  async findAll() {
    return await this.stationEmployeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.stationEmployeService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStationEmployeDto: UpdateStationEmployeDto) {
    return await this.stationEmployeService.update(id, updateStationEmployeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.stationEmployeService.remove(id);
  }
}
