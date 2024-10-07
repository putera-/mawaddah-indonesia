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
            const title = `${user.firstname} telah mengajukan permintaan taaruf`;
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taaruf.id } },
                title,
                datetime: new Date(),
                messages: {
                    create: {
                        sender: { connect: { id: userId } },
                        receiver: { connect: { id: candidate.id } },
                        message,
                        title,
                        taaruf_process: TaarufProcess.TaarufRequest
                    }
                }
            }
            await this.inboxService.create(userId, candidate.id, taaruf.id, dataInbox);
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
            where: {
                id,
                candidateId,
            },
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        // check taaruf status
        if (taaruf.status == ApprovalStatus.Approved) throw new BadRequestException('Taaruf telah disetujui, tidak bisa mengubah data');
        if (taaruf.status == ApprovalStatus.Canceled) throw new BadRequestException('Taaruf telah dibatalkan, tidak bisa mengubah data');
        if (taaruf.status == ApprovalStatus.Rejected) throw new BadRequestException('Taaruf telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: candidateId } }
        }

        // update taaruf with response
        const update_taaruf = await this.PrismaService.taaruf.update({
            where: { id, candidateId },
            data: {
                status: ApprovalStatus.Approved,
                taaruf_process: TaarufProcess.TaarufApproved,
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
            const title = `${user.firstname} telah menerima permintaan taaruf`;
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taaruf.id } },
                title,
                datetime: new Date(),
                messages: {
                    create: {
                        sender: { connect: { id: candidateId } },
                        receiver: { connect: { id: taaruf.userId } },
                        message,
                        title,
                        taaruf_process: TaarufProcess.TaarufApproved
                    }
                }
            }
            await this.inboxService.create(candidateId, taaruf.userId, taaruf.id, dataInbox);
        }

        return update_taaruf;
    }

    async reject(candidateId: string, id: string, message: string) {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: { id, candidateId },
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: candidateId } }
        }

        const update_taaruf = await this.PrismaService.taaruf.update({
            where: { id, candidateId },
            data: {
                active: false,
                status: ApprovalStatus.Rejected,
                taaruf_process: TaarufProcess.TaarufRejected,
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
            const title = `${user.firstname} menolak permintaan taaruf`;
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taaruf.id } },
                title,
                datetime: new Date(),
                messages: {
                    create: {
                        sender: { connect: { id: candidateId } },
                        receiver: { connect: { id: taaruf.userId } },
                        message,
                        title,
                        taaruf_process: TaarufProcess.TaarufRejected
                    }
                }

            }
            await this.inboxService.create(candidateId, taaruf.userId, taaruf.id, dataInbox);
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
            const title = `${user.firstname} telah membatalkan taaruf`;

            // get receiverId, karena yang mencancel bisa candidate maupun yang mengajukan taaruf
            const receiverId = taaruf.userId != userId ? userId : taaruf.candidateId;

            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taaruf.id } },
                title,
                datetime: new Date(),
                messages: {
                    create: {
                        sender: { connect: { id: userId } },
                        receiver: { connect: { id: receiverId } },
                        message,
                        title,
                        taaruf_process: TaarufProcess.Canceled
                    }
                }
            }
            await this.inboxService.create(userId, taaruf.candidateId, taaruf.id, dataInbox);
        }
    }

    async cancel_response(userId: string, id: string, message: string) {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: {
                id,
                userId,
                taaruf_process: TaarufProcess.Canceled
            },
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        const user = await this.PrismaService.user.findFirst({
            where: { id: userId },
        });

        // CREATE inbox sender & receiver
        const title = `${user.firstname} meresponse pemmbatalkan taaruf`;

        // get receiverId, karena yang mencancel bisa candidate maupun yang mengajukan taaruf
        const receiverId = taaruf.userId != userId ? userId : taaruf.candidateId;

        const dataInbox: Prisma.InboxCreateWithoutUserInput = {
            taaruf: { connect: { id: taaruf.id } },
            title,
            datetime: new Date(),
            messages: {
                create: {
                    sender: { connect: { id: userId } },
                    receiver: { connect: { id: receiverId } },
                    message,
                    title,
                    taaruf_process: TaarufProcess.Canceled
                }
            }
        }
        await this.inboxService.create(userId, taaruf.candidateId, taaruf.id, dataInbox);
    }
}
