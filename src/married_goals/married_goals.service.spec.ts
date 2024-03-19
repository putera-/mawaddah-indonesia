import { Test, TestingModule } from '@nestjs/testing';
import { MarriedGoalsService } from './married_goals.service';

describe('MarriedGoalsService', () => {
  let service: MarriedGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarriedGoalsService],
    }).compile();

    service = module.get<MarriedGoalsService>(MarriedGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
