import { Module } from '@nestjs/common';
import { KhitbahService } from './khitbah.service';
import { KhitbahController } from './khitbah.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KhitbahController],
  providers: [KhitbahService, PrismaService],
})
export class KhitbahModule {}
