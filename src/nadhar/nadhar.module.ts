import { Module } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { NadharController } from './nadhar.controller';

@Module({
  controllers: [NadharController],
  providers: [NadharService],
})
export class NadharModule {}
