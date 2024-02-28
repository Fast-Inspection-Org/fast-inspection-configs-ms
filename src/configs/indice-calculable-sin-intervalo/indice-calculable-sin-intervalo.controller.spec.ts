import { Test, TestingModule } from '@nestjs/testing';
import { IndiceCalculableSinIntervaloController } from './indice-calculable-sin-intervalo.controller';

describe('IndiceCalculableSinIntervaloController', () => {
  let controller: IndiceCalculableSinIntervaloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndiceCalculableSinIntervaloController],
    }).compile();

    controller = module.get<IndiceCalculableSinIntervaloController>(IndiceCalculableSinIntervaloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
