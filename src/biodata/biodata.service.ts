import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Biodata, Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class BiodataService {
    constructor(private Prisma: PrismaService) { }

    async create(id: string, data: Prisma.BiodataCreateInput) {
        const result = await this.Prisma.biodata.create({
            data: {
                ...data,
                user: {
                    connect: { id },
                },
            },
        });
        await this.Prisma.user.update({
            where: { id },
            data: { taaruf_status: 'OPEN' },
        });
        return result;
    }

    async findMe(userId: string): Promise<Biodata> {
        return await this.Prisma.biodata.findFirst({
            where: { userId },
        });
    }

    async findMeComplete(userId: string): Promise<Biodata> {
        return await this.Prisma.biodata.findFirst({
            where: { userId },
            include: {
                physical_characters: true,
                non_physical_characters: true,
                marriage_preparations: true,
                family_members: {
                    where: {
                        deleted: false
                    }
                },
                educations: {
                    where: {
                        deleted: false
                    }
                },
                life_goals: true,
                ibadah: true,
                physical_criteria: true,
                non_physical_criteria: true,
                experiences: {
                    where: {
                        deleted: false
                    }
                }
            }
        });
    }

    update(id: string, data: Prisma.BiodataUpdateInput) {
        return this.Prisma.biodata.update({ where: { userId: id }, data });
    }
}
