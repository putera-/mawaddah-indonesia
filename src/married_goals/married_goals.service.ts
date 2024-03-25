import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateMarriedGoalDto } from './dto/update-married_goal.dto';
import { Prisma, TaarufStatus } from '@prisma/client';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';

const select = {
    id: true,
    userId: true,
    title: true,
    createdAt: true,
    updatedAt: true,
};

@Injectable()
export class MarriedGoalsService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
    ) { }

    async create(id: string, data: Prisma.MarriedGoalCreateInput) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true, taaruf_status: true },
        });

        if (user.taaruf_status !== TaarufStatus.OPEN) throw new ForbiddenException(`Taaruf is not open or pending`);

        return this.prisma.marriedGoal.create({
            data: { ...data, User: { connect: { id } } },
            select,
        });
    }

    async findAll(userId: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.marriedGoal.count({
                where: { userId, deleted: false },
            }),
            this.prisma.marriedGoal.findMany({
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

    async findOne(userId: string, id: string) {
        const data = await this.prisma.marriedGoal.findFirst({
            where: { id, userId, deleted: false },
            select,
        });
        if (!data) {
            // Check if the education record exists for any user
            const goalExist = await this.prisma.marriedGoal.findUnique({
                where: { id, deleted: false },
            });

            // If the education record exists but does not belong to the requesting user
            if (goalExist) {
                throw new ForbiddenException(
                    `You dont have permission to access / on this server`,
                );
            } else {
                throw new NotFoundException(`Data Not Found`);
            }
        }
        return data;
    }

    async update(userId: string, id: string, data: UpdateMarriedGoalDto) {
        const goalId = await this.findOne(userId, id);

        return this.prisma.marriedGoal.update({
            where: { id: goalId.id },
            data: { ...data },
            select,
        });
    }

    async remove(userId: string, id: string) {
        const goalId = await this.findOne(userId, id);

        return this.prisma.marriedGoal.update({
            where: { id: goalId.id },
            data: { deleted: false },
        });
    }
}
