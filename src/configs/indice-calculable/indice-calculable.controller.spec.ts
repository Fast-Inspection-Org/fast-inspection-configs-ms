import { Test, TestingModule } from '@nestjs/testing';
import { IndiceCalculableController } from './indice-calculable.controller';

describe('IndiceCalculableController', () => {
  let controller: IndiceCalculableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndiceCalculableController],
    }).compile();

    controller = module.get<IndiceCalculableController>(IndiceCalculableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
