import { Test, TestingModule } from '@nestjs/testing';
import { DeterioroController } from './deterioro.controller';

describe('DeterioroController', () => {
  let controller: DeterioroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeterioroController],
    }).compile();

    controller = module.get<DeterioroController>(DeterioroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
