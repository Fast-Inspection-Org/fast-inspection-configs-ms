import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoController } from './campo-definido.controller';

describe('CampoDefinidoController', () => {
  let controller: CampoDefinidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampoDefinidoController],
    }).compile();

    controller = module.get<CampoDefinidoController>(CampoDefinidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
