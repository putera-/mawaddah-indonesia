import { Module } from '@nestjs/common';
import { NonPhysicalCriteriaService } from './non_physical_criteria.service';
import { NonPhysicalCriteriaController } from './non_physical_criteria.controller';
import { PrismaService } from 'src/prisma.service';
import { BiodataService } from 'src/biodata/biodata.service';

@Module({
    controllers: [NonPhysicalCriteriaController],
    providers: [NonPhysicalCriteriaService, PrismaService, BiodataService],
})
export class NonPhysicalCriteriaModule {}
