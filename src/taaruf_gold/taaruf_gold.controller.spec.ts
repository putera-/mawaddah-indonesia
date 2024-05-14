import { Test, TestingModule } from '@nestjs/testing';
import { TaarufGoldController } from './taaruf_gold.controller';
import { TaarufGoldService } from './taaruf_gold.service';

describe('TaarufGoldController', () => {
  let controller: TaarufGoldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaarufGoldController],
      providers: [TaarufGoldService],
    }).compile();

    controller = module.get<TaarufGoldController>(TaarufGoldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
