import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaarufDto } from './dto/create-taaruf.dto';
import { UpdateTaarufDto } from './dto/update-taaruf.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma } from '@prisma/client';
import { Taaruf } from './taaruf.interface';

@Injectable()
export class TaarufService {
    constructor(
        private PrismaService: PrismaService,
        private User: UsersService,
    ) {}
    async create(userId: string, id: string, message: string): Promise<void> {
        const user = await this.User.findOne(userId, 'MEMBER');
        if (!user) throw new NotFoundException('Pengguna tidak ditemukan');

        const candidate = await this.PrismaService.user.findFirst({
            where: { id },
        });

        if (!candidate) throw new NotFoundException('Pengguna tidak ditemukan');
        const data: Prisma.TaarufCreateInput = {
            message,
            user: { connect: { id: user.id } },
            candidate: { connect: { id: candidate.id } },
            approval: {
                create: {
                    message,
                    reply: '',
                },
            },
        };
        data.message = message;
        const result = await this.PrismaService.taaruf.create({
            data,
            include: {
                approval: true,
                nadhars: true,
                khitbahs: true,
                akads: true,
            },
        });
        console.log(result);
    }

    async findAllIncoming(userId: string, page = '1', limit = '10') {
        const data = await this.PrismaService.taaruf.findMany({
            where: { candidateId: userId },
            orderBy: { createdAt: 'desc' },
            take: Number(limit),
        });
        const total = data.length;
        var maxPages = total / Number(limit);
        maxPages = Math.ceil(maxPages);
        const result = { data, total, page, maxPages, limit };
        return result;
    }

    async findAllOutgoing(userId: string, page = '1', limit = '10') {
        const data = await this.PrismaService.taaruf.findMany({
            where: { userId: userId },
            take: Number(limit),
        });
        const total = data.length;
        var maxPages = total / Number(limit);
        maxPages = Math.ceil(maxPages);
        const result = { data, total, page, maxPages, limit };
        return result;
    }

    async findIncoming(candidateId: string, id: string): Promise<Taaruf> {
        return await this.PrismaService.taaruf.findFirst({
            where: { id, candidateId },
        });
    }

    async findOutgoing(userId: string, id: string): Promise<Taaruf> {
        return await this.PrismaService.taaruf.findFirst({
            where: { id, userId },
        });
    }

    async approve(candidateId: string, id: string, message: string) {
        return await this.PrismaService.taaruf.update({
            where: { id, candidateId },
            data: {
                approval: {
                    update: {
                        status: 'Yes',
                        message,
                    },
                },
            },
        });
    }

    async reject(candidateId: string, id: string, message: string) {
        return await this.PrismaService.taaruf.update({
            where: { id, candidateId },
            data: {
                approval: {
                    update: {
                        status: 'No',
                        message,
                    },
                },
            },
        });
    }

    async cancel(userId: string, id: string, message: string) {
        return await this.PrismaService.taaruf.update({
            where: {
                id,
                userId,
            },
            data: {
                status: false,
                message,
            },
        });
    }
}
