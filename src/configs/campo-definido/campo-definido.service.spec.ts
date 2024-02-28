import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoService } from './campo-definido.service';

describe('CampoDefinidoService', () => {
  let service: CampoDefinidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampoDefinidoService],
    }).compile();

    service = module.get<CampoDefinidoService>(CampoDefinidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
