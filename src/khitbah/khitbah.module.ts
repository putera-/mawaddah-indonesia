import { Module } from '@nestjs/common';
import { KhitbahService } from './khitbah.service';
import { KhitbahController } from './khitbah.controller';

@Module({
  controllers: [KhitbahController],
  providers: [KhitbahService],
})
export class KhitbahModule {}
