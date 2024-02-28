import { Test, TestingModule } from '@nestjs/testing';
import { HerramientasService } from './herramientas.service';

describe('HerramientasService', () => {
  let service: HerramientasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HerramientasService],
    }).compile();

    service = module.get<HerramientasService>(HerramientasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
