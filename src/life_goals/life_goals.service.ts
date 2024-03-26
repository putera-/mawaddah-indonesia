import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateLifeGoalDto } from './dto/create-life_goal.dto';
import { UpdateLifeGoalDto } from './dto/update-life_goal.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma, TaarufStatus } from '@prisma/client';
import { Life_goal } from './life_goals.interface';

const select = {
    id: true,
    userId: true,
    title: true,
    createdAt: true,
    updatedAt: true,
};
@Injectable()
export class LifeGoalsService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
    ) { }

    async create(id: string, data: Prisma.LifeGoalCreateInput): Promise<Life_goal> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true, taaruf_status: true },
        });

        if (user.taaruf_status !== TaarufStatus.OPEN) throw new ForbiddenException(`Taaruf is not open or pending`);

        return this.prisma.lifeGoal.create({
            data: { ...data, User: { connect: { id } } },
            select,
        });
    }

    async findAll(userId: string, page: number = 1, limit: number = 10): Promise<Record<string, any>> {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.lifeGoal.count({
                where: { userId, deleted: false },
            }),
            this.prisma.lifeGoal.findMany({
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
        const data = await this.prisma.lifeGoal.findFirst({
            where: { id, userId, deleted: false },
            select,
        });
        if (!data) {
            // Check if the education record exists for any user
            const life_goalExist = await this.prisma.lifeGoal.findUnique({
                where: { id, deleted: false },
            });
            // If the education record exists but does not belong to the requesting user
            if (life_goalExist) {
                throw new ForbiddenException(
                    `You dont have permission to access / on this server`,
                );
            } else {
                throw new NotFoundException(`Data Not Found`);
            }
        }
        return data;
    }

    async update(userId: string, id: string, data: UpdateLifeGoalDto): Promise<Life_goal> {
        const goalId = await this.findOne(userId, id);

        return this.prisma.lifeGoal.update({
            where: { id: goalId.id },
            data: { ...data },
            select,
        });
    }

    async remove(userId: string, id: string): Promise<Life_goal> {
        const Life_goalId = await this.findOne(userId, id);

        return this.prisma.lifeGoal.update({
            where: { id: Life_goalId.id },
            data: { deleted: true },
        });
    }
}
