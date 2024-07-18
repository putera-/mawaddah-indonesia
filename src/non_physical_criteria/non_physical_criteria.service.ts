import { Injectable } from '@nestjs/common';
import { UpdateNonPhysicalCriteriaDto } from './dto/update-non_physical_criteria.dto';
import { CreateNonPhysicalCriteriaDto } from './dto/create-non_physical_criteria.dto';
import { PrismaService } from 'src/prisma.service';
import { NonPhysicalCriteria, Prisma } from '@prisma/client';

@Injectable()
export class NonPhysicalCriteriaService {
    constructor(private prisma: PrismaService) {}

    async upsert(
        biodataId: string,
        data: Prisma.NonPhysicalCriteriaCreateInput,
    ) {
        return this.prisma.nonPhysicalCriteria.upsert({
            where: { biodataId },
            update: data,
            create: data,
        });
    }

    async findOne(
        userId: string,
        biodataId: string,
    ): Promise<NonPhysicalCriteria> {
        const data = await this.prisma.biodata.findFirst({
            where: {
                userId,
            },
            select: {
                id: true,
                non_physical_criteria: true,
            },
        });

        if (!data.non_physical_criteria) {
            return this.prisma.nonPhysicalCriteria.create({
                data: { biodata: { connect: { id: biodataId } } },
            });
        }

        return data.non_physical_criteria;
    }
}
