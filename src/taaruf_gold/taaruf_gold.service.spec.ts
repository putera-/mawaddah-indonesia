import { Test, TestingModule } from '@nestjs/testing';
import { TaarufGoldService } from './taaruf_gold.service';

describe('TaarufGoldService', () => {
  let service: TaarufGoldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaarufGoldService],
    }).compile();

    service = module.get<TaarufGoldService>(TaarufGoldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
