import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';

@Controller('beneficiary')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Post()
  async create(@Body() createBeneficiaryDto: CreateBeneficiaryDto) {
    return await this.beneficiaryService.create(createBeneficiaryDto);
  }

  @Get()
  async findAll() {
    return await this.beneficiaryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.beneficiaryService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBeneficiaryDto: UpdateBeneficiaryDto) {
    return await this.beneficiaryService.update(id, updateBeneficiaryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.beneficiaryService.remove(id);
  }
}
