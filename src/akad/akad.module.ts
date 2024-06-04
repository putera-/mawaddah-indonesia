import { Module } from '@nestjs/common';
import { AkadService } from './akad.service';
import { AkadController } from './akad.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AkadController],
  providers: [AkadService, PrismaService],
})
export class AkadModule {}
