import { Test, TestingModule } from '@nestjs/testing';
import { MaterialesConfigService } from './materiales-config.service';

describe('MaterialesConfigService', () => {
  let service: MaterialesConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialesConfigService],
    }).compile();

    service = module.get<MaterialesConfigService>(MaterialesConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
