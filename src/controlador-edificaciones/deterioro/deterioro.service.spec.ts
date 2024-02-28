import { Test, TestingModule } from '@nestjs/testing';
import { DeterioroService } from './deterioro.service';

describe('DeterioroService', () => {
  let service: DeterioroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeterioroService],
    }).compile();

    service = module.get<DeterioroService>(DeterioroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
