import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeterioroAnalisisCriticidadConfigService } from './tipo-deterioro-analisis-criticidad-config.service';

describe('TipoDeterioroAnalisisCriticidadConfigService', () => {
  let service: TipoDeterioroAnalisisCriticidadConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoDeterioroAnalisisCriticidadConfigService],
    }).compile();

    service = module.get<TipoDeterioroAnalisisCriticidadConfigService>(TipoDeterioroAnalisisCriticidadConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
