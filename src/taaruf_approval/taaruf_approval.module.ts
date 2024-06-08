import { Module } from '@nestjs/common';
import { TaarufApprovalService } from './taaruf_approval.service';
import { TaarufApprovalController } from './taaruf_approval.controller';

@Module({
  controllers: [TaarufApprovalController],
  providers: [TaarufApprovalService],
})
export class TaarufApprovalModule {}
