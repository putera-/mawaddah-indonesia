import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalCharsService } from './physical_chars.service';

describe('PhysicalCharsService', () => {
  let service: PhysicalCharsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalCharsService],
    }).compile();

    service = module.get<PhysicalCharsService>(PhysicalCharsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
