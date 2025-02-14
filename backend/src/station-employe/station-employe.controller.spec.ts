import { Test, TestingModule } from '@nestjs/testing';
import { StationEmployeController } from './station-employe.controller';
import { StationEmployeService } from './station-employe.service';

describe('StationEmployeController', () => {
  let controller: StationEmployeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationEmployeController],
      providers: [StationEmployeService],
    }).compile();

    controller = module.get<StationEmployeController>(StationEmployeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
