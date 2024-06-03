import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoImagenService } from './campo-definido-imagen.service';

describe('CampoDefinidoImagenService', () => {
  let service: CampoDefinidoImagenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampoDefinidoImagenService],
    }).compile();

    service = module.get<CampoDefinidoImagenService>(CampoDefinidoImagenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
