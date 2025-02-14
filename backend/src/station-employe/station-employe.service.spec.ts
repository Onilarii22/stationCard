import { Test, TestingModule } from '@nestjs/testing';
import { StationEmployeService } from './station-employe.service';

describe('StationEmployeService', () => {
  let service: StationEmployeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationEmployeService],
    }).compile();

    service = module.get<StationEmployeService>(StationEmployeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
