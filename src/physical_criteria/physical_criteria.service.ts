import { Injectable } from '@nestjs/common';
import { PhysicalCriteria, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PhysicalCriteriaService {
    constructor(private prisma: PrismaService) {}

    async upsert(biodataId: string, data: Prisma.PhysicalCriteriaCreateInput) {
        return this.prisma.physicalCriteria.upsert({
            where: { biodataId },
            update: data,
            create: data,
        });
    }

    async findOne(
        userId: string,
        biodataId: string,
    ): Promise<PhysicalCriteria> {
        const data = await this.prisma.biodata.findFirst({
            where: {
                userId,
            },
            select: {
                id: true,
                physical_criteria: true,
            },
        });

        if (!data.physical_criteria) {
            return this.prisma.physicalCriteria.create({
                data: {
                    Biodata: { connect: { id: biodataId } },
                },
            });
        }

        return data.physical_criteria;
    }
}
