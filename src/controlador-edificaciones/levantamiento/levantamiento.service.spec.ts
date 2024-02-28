import { Test, TestingModule } from '@nestjs/testing';
import { LevantamientoService } from './levantamiento.service';

describe('LevantamientoService', () => {
  let service: LevantamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevantamientoService],
    }).compile();

    service = module.get<LevantamientoService>(LevantamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
