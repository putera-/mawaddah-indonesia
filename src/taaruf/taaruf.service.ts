import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { ApprovalStatus, Prisma, TaarufProcess } from '@prisma/client';
import { Taaruf } from './taaruf.interface';
import { InboxService } from 'src/inbox/inbox.service';

@Injectable()
export class TaarufService {
    constructor(
        private PrismaService: PrismaService,
        private userService: UsersService,
        private inboxService: InboxService,
    ) { }
    async create(
        userId: string,
        candidateId: string,
        message: string,
    ): Promise<Taaruf> {
        // check if candidate is not exist
        const user = await this.PrismaService.user.findFirst({
            where: { id: userId },
        });
        const candidate = await this.PrismaService.user.findFirst({
            where: { id: candidateId },
        });
        if (!candidate) throw new NotFoundException('Pengguna tidak ditemukan');

        // check if connection already created
        const exist = await this.PrismaService.taaruf.findFirst({
            // find by pending or already approved
            where: {
                userId,
                candidateId,
                active: true,
            },
        });
        if (exist)
            throw new ConflictException(
                'Anda telah mengajukan taaaruf dengan kandidat ini',
            );

        // create data taaruf
        const data: Prisma.TaarufCreateInput = {
            message,
            user: { connect: { id: userId } },
            candidate: { connect: { id: candidate.id } },
        };

        const taaruf = await this.PrismaService.taaruf.create({
            data
        });

        {
            // CREATE inbox sender & receiver
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taaruf.id } },
                title: `${user.firstname} telah mengajukan permintaan taaruf`,
                datetime: new Date(),
            }
            await this.inboxService.create(userId, candidate.id, dataInbox);
        }

        return taaruf;
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

    async approve(candidateId: string, id: string, message: string): Promise<Taaruf> {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: { id, candidateId },
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        const response: Prisma.ResponseCreateInput = {
            taaruf: { connect: { id } },
            message,
            responseBy: { connect: { id: candidateId } }
        }

        // update taaruf
        const update_taaruf = await this.PrismaService.taaruf.update({
            where: { id, candidateId },
            data: {
                status: ApprovalStatus.Yes,
                latestProcess: TaarufProcess.Taaruf,
                response: {
                    create: response
                }
            }
        });

        // create inbox
        {
            const user = await this.PrismaService.user.findFirst({
                where: { id: candidateId },
            });
            // CREATE inbox sender & receiver
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taaruf.id } },
                title: `${user.firstname} telah menerima permintaan taaruf`,
                datetime: new Date(),
            }
            await this.inboxService.create(candidateId, taaruf.userId, dataInbox);
        }


        return update_taaruf;
    }

    async reject(candidateId: string, id: string, message: string) {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: { id, candidateId },
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        const response: Prisma.ResponseCreateInput = {
            taaruf: { connect: { id } },
            message,
            responseBy: { connect: { id: candidateId } }
        }

        const update_taaruf = await this.PrismaService.taaruf.update({
            where: { id, candidateId },
            data: {
                active: false,
                status: ApprovalStatus.No,
                latestProcess: TaarufProcess.Taaruf,
                response: {
                    create: response
                }
            },
        });

        // create inbox
        {
            const user = await this.PrismaService.user.findFirst({
                where: { id: candidateId },
            });
            // CREATE inbox sender & receiver
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taaruf.id } },
                title: `${user.firstname} menolak permintaan taaruf`,
                datetime: new Date(),
            }
            await this.inboxService.create(candidateId, taaruf.userId, dataInbox);
        }


        return update_taaruf;
    }

    async cancel(userId: string, id: string, message: string) {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: { id, userId },
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        // update taaruf
        await this.PrismaService.taaruf.update({
            where: { id, userId },
            data: {
                active: false,
                status: ApprovalStatus.Canceled,
                cancelation: {
                    create: {
                        cancelBy: { connect: { id: userId } },
                        message
                    }
                }
            },
        });

        {
            const user = await this.PrismaService.user.findFirst({
                where: { id: userId },
            });

            // CREATE inbox sender & receiver
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taaruf.id } },
                title: `${user.firstname} telah membatalkan taaruf`,
                datetime: new Date(),
            }
            await this.inboxService.create(userId, taaruf.candidateId, dataInbox);
        }
    }

    // TODO response cancelation
}
