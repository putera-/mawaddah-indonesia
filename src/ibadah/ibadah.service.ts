import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Ibadah, Prisma } from '@prisma/client';

@Injectable()
export class IbadahService {
    constructor(private prisma: PrismaService) { }

    async upsert(biodataId: string, data: Prisma.IbadahCreateInput) {
        return this.prisma.ibadah.upsert({
            where: { biodataId },
            update: data,
            create: data,
        });
    }
    async findOne(userId: string, biodataId: string): Promise<Ibadah> {
        const data = await this.prisma.biodata.findFirst({
            where: {
                userId,
            },
            select: {
                id: true,
                ibadah: true,
            },
        });

        if (!data.ibadah) {
            return this.prisma.ibadah.create({
                data: {
                    biodata: { connect: { id: biodataId } },
                },
            });
        }

        return data.ibadah;
    }
}
