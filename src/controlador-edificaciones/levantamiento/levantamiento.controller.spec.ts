import { Test, TestingModule } from '@nestjs/testing';
import { LevantamientoController } from './levantamiento.controller';

describe('LevantamientoController', () => {
  let controller: LevantamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevantamientoController],
    }).compile();

    controller = module.get<LevantamientoController>(LevantamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
