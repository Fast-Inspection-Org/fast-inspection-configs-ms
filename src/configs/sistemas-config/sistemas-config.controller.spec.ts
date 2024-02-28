import { Test, TestingModule } from '@nestjs/testing';
import { SistemasConfigController } from './sistemas-config.controller';

describe('SistemasConfigController', () => {
  let controller: SistemasConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SistemasConfigController],
    }).compile();

    controller = module.get<SistemasConfigController>(SistemasConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
