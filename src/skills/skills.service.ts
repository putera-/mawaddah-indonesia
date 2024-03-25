import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma, TaarufStatus } from '@prisma/client';

const select = {
    id: true,
    userId: true,
    title: true,
    createdAt: true,
    updatedAt: true
}

@Injectable()
export class SkillsService {
    constructor(private prisma: PrismaService, private userService: UsersService) { }

    async create(id: string, data: Prisma.SkillCreateInput) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true, taaruf_status: true },
        });

        if (user.taaruf_status !== TaarufStatus.OPEN) throw new ForbiddenException(`Taaruf is not open or pending`);

        return this.prisma.skill.create({
            data: { ...data, User: { connect: { id } } },
            select
        });
    }

    async findAll(userId: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.skill.count({
                where: { userId, deleted: false },
            }),
            this.prisma.skill.findMany({
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

    async findOne(userId: string, id: string) {
        const data = await this.prisma.skill.findFirst({ where: { id, userId, deleted: false }, select });
        if (!data) {
            // Check if the education record exists for any user
            const skillExist = await this.prisma.skill.findUnique({ where: { id, deleted: false } });

            // If the education record exists but does not belong to the requesting user
            if (skillExist) {
                throw new ForbiddenException(`You dont have permission to access / on this server`);
            } else {
                throw new NotFoundException(`Data Not Found`);
            }
        };
        return data;
    }

    async update(userId: string, id: string, data: UpdateSkillDto) {
        const skillId = await this.findOne(userId, id);

        return this.prisma.skill.update({
            where: { id: skillId.id },
            data: { ...data },
            select
        });
    }

    async remove(userId: string, id: string) {
        const skillId = await this.findOne(userId, id);

        return this.prisma.skill.update({
            where: { id: skillId.id },
            data: { deleted: true }
        });
    }
}
