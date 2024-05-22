import { Module } from '@nestjs/common';
import { AkadService } from './akad.service';
import { AkadController } from './akad.controller';

@Module({
  controllers: [AkadController],
  providers: [AkadService],
})
export class AkadModule {}
