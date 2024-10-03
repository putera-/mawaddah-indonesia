import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma } from '@prisma/client';
import { Taaruf } from './taaruf.interface';

@Injectable()
export class TaarufService {
    constructor(
        private PrismaService: PrismaService,
        private userService: UsersService,
    ) { }
    async create(
        userId: string,
        candidateId: string,
        message: string,
    ): Promise<void> {
        // check if candidate is not exist
        const candidate = await this.PrismaService.user.findFirst({
            where: { id: candidateId },
        });
        if (!candidate) throw new NotFoundException('Pengguna tidak ditemukan');

        // check if connection already created
        const exist = await this.PrismaService.taaruf.findFirst({
            // FIXME where status is true, jadi klopun sudah false, akan tetap bisa ajukan ulang
            where: { userId, candidateId },
        });
        if (exist)
            throw new ConflictException(
                'Anda telah mengajukan taaaruf dengan kandidat ini',
            );

        // data input
        const data: Prisma.TaarufCreateInput = {
            message,
            user: { connect: { id: userId } },
            candidate: { connect: { id: candidate.id } },
            approval: {
                create: {
                    message,
                    reply: '',
                },
            },
        };

        // create data
        await this.PrismaService.taaruf.create({
            data,
            include: {
                approval: true,
                nadhars: true,
                khitbahs: true,
                akads: true,
            },
        });

        /** TODO
        CREATE inbox
        */
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
        const result = await this.PrismaService.taaruf.findFirst({
            where: { id, candidateId },
        });
        if (!result) throw new NotFoundException('Data tidak ditemukan');
        return result;
    }

    async findOutgoing(userId: string, id: string): Promise<Taaruf> {
        const result = await this.PrismaService.taaruf.findFirst({
            where: { id, userId },
            include: {
                candidate: {
                    include: {
                        biodata: true,
                    },
                },
            },
        });

        if (!result) throw new NotFoundException('Data tidak ditemukan');
        this.userService.formatGray(result.candidate);

        return result;
    }

    async approve(candidateId: string, id: string, message: string) {
        const result = await this.PrismaService.taaruf.findFirst({
            where: { id, candidateId },
        });
        if (!result) throw new NotFoundException('Data tidak valid');

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
        return result;
    }

    async reject(candidateId: string, id: string, message: string) {
        const result = await this.PrismaService.taaruf.findFirst({
            where: { id, candidateId },
        });
        if (!result) throw new NotFoundException('Data tidak valid');

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

        // TODO update taaruf status = false
    }

    async cancel(userId: string, id: string, message: string) {
        const result = await this.PrismaService.taaruf.findFirst({
            where: { id, userId },
        });
        if (!result) throw new NotFoundException('Data tidak valid');
        return await this.PrismaService.taaruf.update({
            where: { id, userId },
            data: {
                status: false,
                message,
            },
        });
    }
}
