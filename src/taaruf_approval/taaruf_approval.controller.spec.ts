import { Test, TestingModule } from '@nestjs/testing';
import { TaarufApprovalController } from './taaruf_approval.controller';
import { TaarufApprovalService } from './taaruf_approval.service';

describe('TaarufApprovalController', () => {
  let controller: TaarufApprovalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaarufApprovalController],
      providers: [TaarufApprovalService],
    }).compile();

    controller = module.get<TaarufApprovalController>(TaarufApprovalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
