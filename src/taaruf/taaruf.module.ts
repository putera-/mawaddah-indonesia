import { Module } from '@nestjs/common';
import { TaarufService } from './taaruf.service';
import { TaarufController } from './taaruf.controller';

@Module({
  controllers: [TaarufController],
  providers: [TaarufService],
})
export class TaarufModule {}
