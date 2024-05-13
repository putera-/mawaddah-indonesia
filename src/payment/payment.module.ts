import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'src/prisma.service';
import { TaarufGoldService } from 'src/taaruf_gold/taaruf_gold.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, TaarufGoldService],
})
export class PaymentModule {}
