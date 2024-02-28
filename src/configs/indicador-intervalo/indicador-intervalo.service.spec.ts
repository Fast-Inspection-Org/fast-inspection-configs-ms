import { Test, TestingModule } from '@nestjs/testing';
import { IndicadorIntervaloService } from './indicador-intervalo.service';

describe('IndicadorIntervaloService', () => {
  let service: IndicadorIntervaloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndicadorIntervaloService],
    }).compile();

    service = module.get<IndicadorIntervaloService>(IndicadorIntervaloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
