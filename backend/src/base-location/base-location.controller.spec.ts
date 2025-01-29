import { Test, TestingModule } from '@nestjs/testing';
import { BaseLocationController } from './base-location.controller';

describe('BaseLocationController', () => {
  let controller: BaseLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseLocationController],
    }).compile();

    controller = module.get<BaseLocationController>(BaseLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
