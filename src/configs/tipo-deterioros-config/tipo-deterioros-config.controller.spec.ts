import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeteriorosConfigController } from './tipo-deterioros-config.controller';

describe('TipoDeteriorosConfigController', () => {
  let controller: TipoDeteriorosConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDeteriorosConfigController],
    }).compile();

    controller = module.get<TipoDeteriorosConfigController>(TipoDeteriorosConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
