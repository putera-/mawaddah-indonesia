import { Test, TestingModule } from '@nestjs/testing';
import { AkadService } from './akad.service';

describe('AkadService', () => {
  let service: AkadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AkadService],
    }).compile();

    service = module.get<AkadService>(AkadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
