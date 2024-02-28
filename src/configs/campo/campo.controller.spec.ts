import { Test, TestingModule } from '@nestjs/testing';
import { CampoController } from './campo.controller';

describe('CampoController', () => {
  let controller: CampoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampoController],
    }).compile();

    controller = module.get<CampoController>(CampoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
