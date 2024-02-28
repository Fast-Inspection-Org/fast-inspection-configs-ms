import { Test, TestingModule } from '@nestjs/testing';
import { TipoDeteriorosConfigService } from './tipo-deterioros-config.service';

describe('TipoDeteriorosConfigService', () => {
  let service: TipoDeteriorosConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoDeteriorosConfigService],
    }).compile();

    service = module.get<TipoDeteriorosConfigService>(TipoDeteriorosConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
