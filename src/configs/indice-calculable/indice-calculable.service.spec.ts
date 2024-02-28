import { Test, TestingModule } from '@nestjs/testing';
import { IndiceCalculableService } from './indice-calculable.service';

describe('IndiceCalculableService', () => {
  let service: IndiceCalculableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndiceCalculableService],
    }).compile();

    service = module.get<IndiceCalculableService>(IndiceCalculableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
