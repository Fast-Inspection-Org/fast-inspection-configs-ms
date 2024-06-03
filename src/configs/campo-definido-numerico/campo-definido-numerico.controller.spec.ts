import { Test, TestingModule } from '@nestjs/testing';
import { CampoDefinidoNumericoController } from './campo-definido-numerico.controller';
import { CampoDefinidoNumericoService } from './campo-definido-numerico.service';

describe('CampoDefinidoNumericoController', () => {
  let controller: CampoDefinidoNumericoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampoDefinidoNumericoController],
      providers: [CampoDefinidoNumericoService],
    }).compile();

    controller = module.get<CampoDefinidoNumericoController>(CampoDefinidoNumericoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
