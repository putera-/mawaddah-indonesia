import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience, Prisma, TaarufStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';



@Injectable()
export class ExperiencesService {
    constructor(private prisma: PrismaService) { }

    async create(
        data: Prisma.ExperienceCreateInput,
    ): Promise<Experience> {

        return this.prisma.experience.create({
            data
        });
    }


    async findAll(
        biodataId: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<Pagination<Experience[]>> {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.experience.count({
                where: { biodataId, deleted: false },
            }),
            this.prisma.experience.findMany({
                where: { biodataId, deleted: false },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit),
            }),
        ]);

        const experiences = data as Experience[];

        return {
            data: experiences,
            total,
            page: +page,
            maxPages: Math.ceil(total / limit),
            limit: +limit,
        };
    }

    async findOne(biodataId: string, id: string): Promise<Record<string, any>> {
        const data = await this.prisma.experience.findFirst({
            where: { id, biodataId, deleted: false },
        });
        if (!data) throw new NotFoundException();
        return data;
    }

    async update(
        biodataId: string,
        id: string,
        data: UpdateExperienceDto,
    ): Promise<Experience> {
        const ExperienceId = await this.findOne(biodataId, id);

        return this.prisma.experience.update({
            where: { id: ExperienceId.id },
            data: { ...data },
        });
    }

    async remove(biodataId: string, id: string): Promise<void> {
        const ExperienceId = await this.findOne(biodataId, id);

        await this.prisma.experience.update({
            where: { id: ExperienceId.id },
            data: { deleted: true },
        });
        return;
    }
}
