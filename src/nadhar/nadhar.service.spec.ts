import { Test, TestingModule } from '@nestjs/testing';
import { NadharService } from './nadhar.service';

describe('NadharService', () => {
  let service: NadharService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NadharService],
    }).compile();

    service = module.get<NadharService>(NadharService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
