import { Test, TestingModule } from '@nestjs/testing';
import { IndicadorSinIntervaloController } from './indicador-sin-intervalo.controller';

describe('IndicadorSinIntervaloController', () => {
  let controller: IndicadorSinIntervaloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicadorSinIntervaloController],
    }).compile();

    controller = module.get<IndicadorSinIntervaloController>(IndicadorSinIntervaloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
