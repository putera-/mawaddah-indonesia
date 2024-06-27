import { Test, TestingModule } from '@nestjs/testing';
import { NonPhysicalCriteriaService } from './non_physical_criteria.service';

describe('NonPhysicalCriteriaService', () => {
  let service: NonPhysicalCriteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NonPhysicalCriteriaService],
    }).compile();

    service = module.get<NonPhysicalCriteriaService>(NonPhysicalCriteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
