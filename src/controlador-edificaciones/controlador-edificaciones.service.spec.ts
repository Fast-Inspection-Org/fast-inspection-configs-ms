import { Test, TestingModule } from '@nestjs/testing';
import { ControladorEdificacionesService } from './controlador-edificaciones.service';

describe('ControladorEdificacionesService', () => {
  let service: ControladorEdificacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControladorEdificacionesService],
    }).compile();

    service = module.get<ControladorEdificacionesService>(ControladorEdificacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
