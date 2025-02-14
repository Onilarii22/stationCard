import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    return await this.districtService.create(createDistrictDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('take') take: number = 10,
  ) {
    const items = await this.districtService.findAll(page, take)
    const totalPages = items.count;
    return {
      data: items.district,
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
    return await this.districtService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return await this.districtService.update(id, updateDistrictDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.districtService.remove(id);
  }
}
