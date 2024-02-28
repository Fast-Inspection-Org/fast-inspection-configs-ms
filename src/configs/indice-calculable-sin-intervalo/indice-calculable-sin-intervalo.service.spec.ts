import { Test, TestingModule } from '@nestjs/testing';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo.service';

describe('IndiceCalculableSinIntervaloService', () => {
  let service: IndiceCalculableSinIntervaloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndiceCalculableSinIntervaloService],
    }).compile();

    service = module.get<IndiceCalculableSinIntervaloService>(IndiceCalculableSinIntervaloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
