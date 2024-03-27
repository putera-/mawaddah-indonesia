import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Prisma, TaarufStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Hobbies } from './hobbies.interface';

const select = {
    id: true,
    userId: true,
    title: true,
    createdAt: true,
    updatedAt: true,
};

@Injectable()
export class HobbiesService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(userId: string, data: Prisma.HobbyCreateInput): Promise<Hobbies> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, taaruf_status: true },
        });
        if (user.taaruf_status !== TaarufStatus.OPEN) throw new ForbiddenException(`Taaruf is not open or pending`);

        return this.prisma.hobby.create({
            data: { ...data, User: { connect: { id: userId } } },
            select,
        });
    }

    async findAll(userId: string, page: number = 1, limit: number = 10): Promise<Pagination<Hobbies[]>> {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.hobby.count({
                where: { userId, deleted: false },
            }),
            this.prisma.hobby.findMany({
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
            limit: +limit
        }
    }

    async findOne(userId: string, id: string): Promise<Record<string, any>> {
        const data = await this.prisma.hobby.findFirst({
            where: { id, userId, deleted: false },
            select,
        });

        if (!data) throw new NotFoundException(`Data Not Found`);
        return data;
    }

    async update(userId: string, id: string, data: UpdateHobbyDto): Promise<Hobbies> {
        const hobbyId = await this.findOne(userId, id);

        return this.prisma.hobby.update({
            where: { id: hobbyId.id },
            data: { ...data },
            select,
        });
    }

    async remove(userId: string, id: string): Promise<void> {
        const hobbyId = await this.findOne(userId, id);

        await this.prisma.hobby.update({
            where: { id: hobbyId.id },
            data: { deleted: true },
        });
        return;
    }
}
