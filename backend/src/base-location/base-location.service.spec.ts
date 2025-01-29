import { Test, TestingModule } from '@nestjs/testing';
import { BaseLocationService } from './base-location.service';

describe('BaseLocationService', () => {
  let service: BaseLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseLocationService],
    }).compile();

    service = module.get<BaseLocationService>(BaseLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
