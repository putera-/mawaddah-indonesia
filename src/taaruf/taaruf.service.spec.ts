import { Test, TestingModule } from '@nestjs/testing';
import { TaarufService } from './taaruf.service';

describe('TaarufService', () => {
  let service: TaarufService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaarufService],
    }).compile();

    service = module.get<TaarufService>(TaarufService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
