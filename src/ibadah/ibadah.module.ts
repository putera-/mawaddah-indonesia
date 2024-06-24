import { Module } from '@nestjs/common';
import { IbadahService } from './ibadah.service';
import { IbadahController } from './ibadah.controller';

@Module({
  controllers: [IbadahController],
  providers: [IbadahService],
})
export class IbadahModule {}
