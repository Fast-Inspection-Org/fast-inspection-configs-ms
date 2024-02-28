import { Test, TestingModule } from '@nestjs/testing';
import { IndicadorIntervaloController } from './indicador-intervalo.controller';

describe('IndicadorIntervaloController', () => {
  let controller: IndicadorIntervaloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicadorIntervaloController],
    }).compile();

    controller = module.get<IndicadorIntervaloController>(IndicadorIntervaloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
