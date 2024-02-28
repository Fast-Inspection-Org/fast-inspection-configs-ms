import { Test, TestingModule } from '@nestjs/testing';
import { EdificacionController } from './edificacion.controller';

describe('EdificacionController', () => {
  let controller: EdificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdificacionController],
    }).compile();

    controller = module.get<EdificacionController>(EdificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
