import { Test, TestingModule } from '@nestjs/testing';
import { TaarufApprovalService } from './taaruf_approval.service';

describe('TaarufApprovalService', () => {
  let service: TaarufApprovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaarufApprovalService],
    }).compile();

    service = module.get<TaarufApprovalService>(TaarufApprovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
