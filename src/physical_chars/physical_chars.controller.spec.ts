import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalCharsController } from './physical_chars.controller';
import { PhysicalCharsService } from './physical_chars.service';

describe('PhysicalCharsController', () => {
  let controller: PhysicalCharsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalCharsController],
      providers: [PhysicalCharsService],
    }).compile();

    controller = module.get<PhysicalCharsController>(PhysicalCharsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
