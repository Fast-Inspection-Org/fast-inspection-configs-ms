import { Test, TestingModule } from '@nestjs/testing';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad.service';

describe('HerramientaAnalisisCriticidadService', () => {
  let service: HerramientaAnalisisCriticidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HerramientaAnalisisCriticidadService],
    }).compile();

    service = module.get<HerramientaAnalisisCriticidadService>(HerramientaAnalisisCriticidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
