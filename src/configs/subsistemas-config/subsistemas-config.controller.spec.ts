import { Test, TestingModule } from '@nestjs/testing';
import { SubsistemasConfigController } from './subsistemas-config.controller';

describe('SubsistemasConfigController', () => {
  let controller: SubsistemasConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsistemasConfigController],
    }).compile();

    controller = module.get<SubsistemasConfigController>(SubsistemasConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
