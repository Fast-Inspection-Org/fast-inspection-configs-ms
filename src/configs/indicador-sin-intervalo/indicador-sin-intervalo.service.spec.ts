import { Test, TestingModule } from '@nestjs/testing';
import { IndicadorSinIntervaloService } from './indicador-sin-intervalo.service';

describe('IndicadorSinIntervaloService', () => {
  let service: IndicadorSinIntervaloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndicadorSinIntervaloService],
    }).compile();

    service = module.get<IndicadorSinIntervaloService>(IndicadorSinIntervaloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
