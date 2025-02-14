import { PartialType } from '@nestjs/swagger';
import { CreateStationEmployeDto } from './create-station-employe.dto';

export class UpdateStationEmployeDto extends PartialType(CreateStationEmployeDto) {}
