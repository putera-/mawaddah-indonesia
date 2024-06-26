import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalCriteriaController } from './physical_criteria.controller';
import { PhysicalCriteriaService } from './physical_criteria.service';

describe('PhysicalCriteriaController', () => {
  let controller: PhysicalCriteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalCriteriaController],
      providers: [PhysicalCriteriaService],
    }).compile();

    controller = module.get<PhysicalCriteriaController>(PhysicalCriteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
