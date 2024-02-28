import { Test, TestingModule } from '@nestjs/testing';
import { ValorCampoDefinidoService } from './valor-campo-definido.service';

describe('ValorCampoDefinidoService', () => {
  let service: ValorCampoDefinidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorCampoDefinidoService],
    }).compile();

    service = module.get<ValorCampoDefinidoService>(ValorCampoDefinidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
