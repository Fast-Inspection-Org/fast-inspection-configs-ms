import { Test, TestingModule } from '@nestjs/testing';
import { EdificacionService } from './edificacion.service';

describe('EdificacionService', () => {
  let service: EdificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdificacionService],
    }).compile();

    service = module.get<EdificacionService>(EdificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
