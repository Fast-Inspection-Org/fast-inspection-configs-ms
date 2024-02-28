import { Test, TestingModule } from '@nestjs/testing';
import { SubsistemasConfigService } from './subsistemas-config.service';

describe('SubsistemasConfigService', () => {
  let service: SubsistemasConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubsistemasConfigService],
    }).compile();

    service = module.get<SubsistemasConfigService>(SubsistemasConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
