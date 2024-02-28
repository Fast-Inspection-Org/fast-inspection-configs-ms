import { Test, TestingModule } from '@nestjs/testing';
import { MaterialesConfigController } from './materiales-config.controller';

describe('MaterialesConfigController', () => {
  let controller: MaterialesConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialesConfigController],
    }).compile();

    controller = module.get<MaterialesConfigController>(MaterialesConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
