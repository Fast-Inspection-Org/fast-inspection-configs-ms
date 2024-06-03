import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoNumericoService } from './campo-definido-numerico.service';

describe('CampoDefinidoNumericoService', () => {
  let service: CampoDefinidoNumericoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampoDefinidoNumericoService],
    }).compile();

    service = module.get<CampoDefinidoNumericoService>(CampoDefinidoNumericoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
