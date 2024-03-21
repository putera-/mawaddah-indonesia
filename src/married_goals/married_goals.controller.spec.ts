import { Test, TestingModule } from '@nestjs/testing';
import { MarriedGoalsController } from './married_goals.controller';
import { MarriedGoalsService } from './married_goals.service';

describe('MarriedGoalsController', () => {
  let controller: MarriedGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarriedGoalsController],
      providers: [MarriedGoalsService],
    }).compile();

    controller = module.get<MarriedGoalsController>(MarriedGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
