import { Test, TestingModule } from '@nestjs/testing';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo.service';

describe('IndiceCalculableIntervaloService', () => {
  let service: IndiceCalculableIntervaloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndiceCalculableIntervaloService],
    }).compile();

    service = module.get<IndiceCalculableIntervaloService>(IndiceCalculableIntervaloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
