import { Test, TestingModule } from '@nestjs/testing';
import { NadharController } from './nadhar.controller';
import { NadharService } from './nadhar.service';

describe('NadharController', () => {
  let controller: NadharController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NadharController],
      providers: [NadharService],
    }).compile();

    controller = module.get<NadharController>(NadharController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
