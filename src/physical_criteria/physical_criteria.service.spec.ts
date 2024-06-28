import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalCriteriaService } from './physical_criteria.service';

describe('PhysicalCriteriaService', () => {
  let service: PhysicalCriteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalCriteriaService],
    }).compile();

    service = module.get<PhysicalCriteriaService>(PhysicalCriteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
