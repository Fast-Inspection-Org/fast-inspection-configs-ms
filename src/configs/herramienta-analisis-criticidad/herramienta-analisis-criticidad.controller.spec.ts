import { Test, TestingModule } from '@nestjs/testing';
import { HerramientaAnalisisCriticidadController } from './herramienta-analisis-criticidad.controller';

describe('HerramientaAnalisisCriticidadController', () => {
  let controller: HerramientaAnalisisCriticidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HerramientaAnalisisCriticidadController],
    }).compile();

    controller = module.get<HerramientaAnalisisCriticidadController>(HerramientaAnalisisCriticidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
