import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, TaarufStatus } from '@prisma/client';
import { Education } from './educations.interface';

const select = {
    id: true,
    userId: true,
    institution_name: true,
    major: true,
    degree: true,
    city: true,
    startYear: true,
    endYear: true,
    createdAt: true,
    updatedAt: true,
};

@Injectable()
export class EducationsService {
    constructor(private prisma: PrismaService) {}
    async create(
        id: string,
        data: Prisma.EducationCreateInput,
    ): Promise<Education> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true, taaruf_status: true },
        });

        if (user.taaruf_status !== TaarufStatus.OPEN)
            throw new ForbiddenException(`Taaruf is not open or pending`);

        return this.prisma.education.create({
            data: { ...data, User: { connect: { id } } },
            select,
        });
    }

    async findAll(
        userId: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<Pagination<Education[]>> {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.education.count({
                where: { userId, deleted: false },
            }),
            this.prisma.education.findMany({
                where: { userId, deleted: false },
                orderBy: { createdAt: 'desc' },
                select,
                skip,
                take: Number(limit),
            }),
        ]);
        return {
            data,
            total,
            page: +page,
            maxPages: Math.ceil(total / limit),
            limit: +limit,
        };
    }

    async findOne(userId: string, id: string): Promise<Record<string, any>> {
        const data = await this.prisma.education.findFirst({
            where: { id, userId, deleted: false },
            select,
        });
        if (!data) throw new NotFoundException();
        return data;
    }

    async update(
        userId: string,
        id: string,
        data: UpdateEducationDto,
    ): Promise<Education> {
        const educationId = await this.findOne(userId, id);

        return this.prisma.education.update({
            where: { id: educationId.id },
            data: { ...data },
            select,
        });
    }

    async remove(userId: string, id: string): Promise<void> {
        const educationId = await this.findOne(userId, id);

        await this.prisma.education.update({
            where: { id: educationId.id },
            data: { deleted: true },
        });
        return;
    }
}
