import { Test, TestingModule } from '@nestjs/testing';
import { NonPhysicalCriteriaController } from './non_physical_criteria.controller';
import { NonPhysicalCriteriaService } from './non_physical_criteria.service';

describe('NonPhysicalCriteriaController', () => {
  let controller: NonPhysicalCriteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonPhysicalCriteriaController],
      providers: [NonPhysicalCriteriaService],
    }).compile();

    controller = module.get<NonPhysicalCriteriaController>(NonPhysicalCriteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
