import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoSeleccionController } from './campo-definido-seleccion.controller';
import { CampoDefinidoSeleccionService } from './campo-definido-seleccion.service';

describe('CampoDefinidoSeleccionController', () => {
  let controller: CampoDefinidoSeleccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampoDefinidoSeleccionController],
      providers: [CampoDefinidoSeleccionService],
    }).compile();

    controller = module.get<CampoDefinidoSeleccionController>(CampoDefinidoSeleccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
