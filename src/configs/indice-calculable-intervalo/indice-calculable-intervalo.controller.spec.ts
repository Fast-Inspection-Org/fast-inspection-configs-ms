import { Test, TestingModule } from '@nestjs/testing';
import { IndiceCalculableIntervaloController } from './indice-calculable-intervalo.controller';

describe('IndiceCalculableIntervaloController', () => {
  let controller: IndiceCalculableIntervaloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndiceCalculableIntervaloController],
    }).compile();

    controller = module.get<IndiceCalculableIntervaloController>(IndiceCalculableIntervaloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
