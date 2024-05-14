import { Module } from '@nestjs/common';
import { TaarufGoldService } from './taaruf_gold.service';
import { TaarufGoldController } from './taaruf_gold.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaarufGoldController],
  providers: [TaarufGoldService, PrismaService],
})
export class TaarufGoldModule {}
