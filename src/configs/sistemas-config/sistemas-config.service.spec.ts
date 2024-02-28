import { Test, TestingModule } from '@nestjs/testing';
import { SistemasConfigService } from './sistemas-config.service';

describe('SistemasConfigService', () => {
  let service: SistemasConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SistemasConfigService],
    }).compile();

    service = module.get<SistemasConfigService>(SistemasConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
