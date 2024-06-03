import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoImagenController } from './campo-definido-imagen.controller';
import { CampoDefinidoImagenService } from './campo-definido-imagen.service';

describe('CampoDefinidoImagenController', () => {
  let controller: CampoDefinidoImagenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampoDefinidoImagenController],
      providers: [CampoDefinidoImagenService],
    }).compile();

    controller = module.get<CampoDefinidoImagenController>(CampoDefinidoImagenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
