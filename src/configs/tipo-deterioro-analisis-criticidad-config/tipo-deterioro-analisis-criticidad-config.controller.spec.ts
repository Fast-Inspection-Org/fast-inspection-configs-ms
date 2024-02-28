import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeterioroAnalisisCriticidadConfigController } from './tipo-deterioro-analisis-criticidad-config.controller';

describe('TipoDeterioroAnalisisCriticidadConfigController', () => {
  let controller: TipoDeterioroAnalisisCriticidadConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDeterioroAnalisisCriticidadConfigController],
    }).compile();

    controller = module.get<TipoDeterioroAnalisisCriticidadConfigController>(TipoDeterioroAnalisisCriticidadConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
