import { Module } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { NadharController } from './nadhar.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [NadharController],
    providers: [NadharService, PrismaService],
})
export class NadharModule {}
