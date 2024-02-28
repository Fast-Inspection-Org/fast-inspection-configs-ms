import { Test, TestingModule } from '@nestjs/testing';
import { ControladorEdificacionesController } from './controlador-edificaciones.controller';

describe('ControladorEdificacionesController', () => {
  let controller: ControladorEdificacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControladorEdificacionesController],
    }).compile();

    controller = module.get<ControladorEdificacionesController>(ControladorEdificacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
