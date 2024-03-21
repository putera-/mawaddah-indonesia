import { Test, TestingModule } from '@nestjs/testing';
import { LifeGoalsService } from './life_goals.service';

describe('LifeGoalsService', () => {
  let service: LifeGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifeGoalsService],
    }).compile();

    service = module.get<LifeGoalsService>(LifeGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
