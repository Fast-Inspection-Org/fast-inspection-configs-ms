import { Test, TestingModule } from '@nestjs/testing';
import { ValorCampoDefinidoController } from './valor-campo-definido.controller';

describe('ValorCampoDefinidoController', () => {
  let controller: ValorCampoDefinidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValorCampoDefinidoController],
    }).compile();

    controller = module.get<ValorCampoDefinidoController>(ValorCampoDefinidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
