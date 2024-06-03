import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoSeleccionService } from './campo-definido-seleccion.service';

describe('CampoDefinidoSeleccionService', () => {
  let service: CampoDefinidoSeleccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampoDefinidoSeleccionService],
    }).compile();

    service = module.get<CampoDefinidoSeleccionService>(CampoDefinidoSeleccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
