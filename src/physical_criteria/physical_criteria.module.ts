import { Module } from '@nestjs/common';
import { PhysicalCriteriaService } from './physical_criteria.service';
import { PhysicalCriteriaController } from './physical_criteria.controller';
import { PrismaService } from 'src/prisma.service';
import { BiodataService } from 'src/biodata/biodata.service';

@Module({
    controllers: [PhysicalCriteriaController],
    providers: [PhysicalCriteriaService, PrismaService, BiodataService],
})
export class PhysicalCriteriaModule {}
