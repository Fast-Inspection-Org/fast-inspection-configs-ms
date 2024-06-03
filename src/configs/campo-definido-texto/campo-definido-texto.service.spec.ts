import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoTextoService } from './campo-definido-texto.service';

describe('CampoDefinidoTextoService', () => {
  let service: CampoDefinidoTextoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampoDefinidoTextoService],
    }).compile();

    service = module.get<CampoDefinidoTextoService>(CampoDefinidoTextoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
