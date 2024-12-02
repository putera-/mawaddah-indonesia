import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import {
    ApprovalStatus,
    Prisma,
    PrismaClient,
    TaarufProcess,
    TaarufStatus,
} from '@prisma/client';
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
    ): Promise<Taaruf> {
        // check if candidate is not exist
        const user = await this.PrismaService.user.findFirst({
            where: { id: userId },
        });
        const candidate = await this.PrismaService.user.findFirst({
            where: { id: candidateId },
        });
        if (!candidate) throw new NotFoundException('Pengguna tidak ditemukan');

        //jika candidate status tidak open, tidak lanjut
        if ((candidate.taaruf_status = TaarufStatus.BLOCKED))
            throw new BadRequestException(
                'Pengguna tidak dapat menerima permintaan taaruf',
            );
        if ((candidate.taaruf_status = TaarufStatus.ACTIVE))
            throw new BadRequestException(
                'Pengguna sedang dalam permintaan taaruf',
            );

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

        const message = `Assalamualaikum Warahmatullahi Wabarakatuh. ${user.firstname} telah mengajukan taaruf. Silahkan meninjau biodata ${user.firstname}. Semoga Allah SWT memberikan petunjuk yang terbaik bagi antum berdua. Aamiin.`;

        // create data taaruf
        const data: Prisma.TaarufCreateInput = {
            message,
            user: { connect: { id: userId } },
            candidate: { connect: { id: candidate.id } },
        };

        const taaruf = await this.PrismaService.taaruf.create({
            data,
        });

        // await this.update_taaruf_status(userId, candidateId, TaarufStatus.OPEN);
        {
            // CREATE inbox sender & receiver
            const titleSender = `Anda telah mengajukan permintaan taaruf`;
            const titleReceiver = `${user.firstname} telah mengajukan permintaan taaruf`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: userId } },
                receiver: { connect: { id: candidate.id } },
                message,
                title: "",
                taaruf_process: TaarufProcess.TaarufRequest,
                taaruf_process_id: taaruf.id,
                taaruf_process_status: ApprovalStatus.Pending,
            }
            await this.inboxService.create(userId, candidate.id, taaruf.id, messageInbox, titleSender, titleReceiver);
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

    async approve(candidateId: string, taarufId: string): Promise<Taaruf> {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: {
                id: taarufId,
                candidateId,
            },
            include: {
                candidate: true,
            }
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        // check taaruf status
        if (taaruf.status == ApprovalStatus.Approved)
            throw new BadRequestException(
                'Taaruf telah disetujui, tidak bisa mengubah data',
            );
        if (taaruf.status == ApprovalStatus.Canceled)
            throw new BadRequestException(
                'Taaruf telah dibatalkan, tidak bisa mengubah data',
            );
        if (taaruf.status == ApprovalStatus.Rejected)
            throw new BadRequestException(
                'Taaruf telah ditolak, tidak bisa mengubah data',
            );

        const message = `Assalamualaikum Warahmatullahi Wabarakatuh. ${taaruf.candidate.firstname} telah menerima pengajuan taaruf. Silahkan saling meninjau biodata. Anda bisa mengajukan nadhar jika merasa ada kecocokan. Semoga Allah SWT memberikan petunjuk yang terbaik bagi antum berdua. Aamiin.`;

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: candidateId } },
        };

        // update taaruf with response
        const update_taaruf = await this.PrismaService.taaruf.update({
            where: { id: taaruf.id, candidateId },
            data: {
                status: ApprovalStatus.Approved,
                taaruf_process: TaarufProcess.TaarufApproved,
                response: {
                    create: response,
                },
            },
        });

        // update previous messsage
        await this.PrismaService.inboxMessage.updateMany({
            where: { taaruf_process_id: taaruf.id },
            data: {
                taaruf_process_status: ApprovalStatus.Approved,
            }
        });

        await this.update_taaruf_status(
            taaruf.userId,
            taaruf.candidateId,
            TaarufStatus.ACTIVE,
        );

        // create inbox
        {
            const user = await this.PrismaService.user.findFirst({
                where: { id: candidateId },
            });
            // CREATE inbox sender & receiver
            const titleSender = `Anda telah menerima permintaan taaruf`;
            const titleReceiver = `${user.firstname} telah menerima permintaan taaruf`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: candidateId } },
                receiver: { connect: { id: taaruf.userId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.TaarufApproved,
                taaruf_process_id: taaruf.id,
                taaruf_process_status: ApprovalStatus.Approved,
            }
            await this.inboxService.create(candidateId, taaruf.userId, taaruf.id, messageInbox, titleSender, titleReceiver);
        }

        return update_taaruf;
    }

    async reject(candidateId: string, taarufId: string) {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: { id: taarufId, candidateId },
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        const candidate = await this.PrismaService.user.findFirst({
            where: { id: candidateId },
        });

        const message = `${candidate.firstname} telah menolak permintaan taaruf. Semoga Allah SWT memberikan petunjuk yang terbaik bagi antum berdua. Aamiin.`;

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: candidateId } },
        };

        const update_taaruf = await this.PrismaService.taaruf.update({
            where: { id: taaruf.id, candidateId },
            data: {
                active: false,
                status: ApprovalStatus.Rejected,
                taaruf_process: TaarufProcess.TaarufRejected,
                response: {
                    create: response,
                },
            },
        });

        // update previous messsage
        await this.PrismaService.inboxMessage.updateMany({
            where: { taaruf_process_id: taaruf.id },
            data: {
                taaruf_process_status: ApprovalStatus.Approved,
            }
        });

        // create inbox
        {
            // CREATE inbox sender & receiver
            const titleSender = `Anda menolak permintaan taaruf`;
            const titleReceiver = `${candidate.firstname} menolak permintaan taaruf`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: candidateId } },
                receiver: { connect: { id: taaruf.userId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.TaarufRejected,
                taaruf_process_id: taaruf.id,
                taaruf_process_status: ApprovalStatus.Rejected
            }
            await this.inboxService.create(candidateId, taaruf.userId, taaruf.id, messageInbox, titleSender, titleReceiver);
        }

        return update_taaruf;
    }

    async cancel(userId: string, taarufId: string, message: string) {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: {
                id: taarufId,
            },
        });
        if (!taaruf) throw new NotFoundException('Taaruf tidak ditemukan');

        // update taaruf
        await this.PrismaService.taaruf.update({
            where: {
                id: taaruf.id
            },
            data: {
                active: false,
                status: ApprovalStatus.Canceled,
                cancelation: {
                    create: {
                        cancelBy: { connect: { id: userId } },
                        message,
                    },
                },
            },
        });

        await this.update_taaruf_status(
            taaruf.userId,
            taaruf.candidateId,
            TaarufStatus.OPEN,
        );

        {
            const user = await this.PrismaService.user.findFirst({
                where: { id: userId },
            });

            // get receiverId, karena yang mencancel bisa candidate maupun yang mengajukan taaruf
            const senderId = userId;
            const receiverId = taaruf.userId == senderId ? taaruf.candidateId : taaruf.userId;

            // CREATE inbox sender & receiver
            const titleSender = `Anda telah membatalkan taaruf`;
            const titleReceiver = `${user.firstname} telah membatalkan taaruf`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: userId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.Canceled,
                taaruf_process_id: taaruf.id,
                taaruf_process_status: ApprovalStatus.Canceled
            }
            await this.inboxService.create(userId, receiverId, taaruf.id, messageInbox, titleSender, titleReceiver);
        }
    }

    async cancel_response(userId: string, taarufId: string, message: string) {
        const taaruf = await this.PrismaService.taaruf.findFirst({
            where: {
                id: taarufId,
                userId,
                taaruf_process: TaarufProcess.Canceled,
            },
        });
        if (!taaruf) throw new NotFoundException('Data tidak valid');

        const user = await this.PrismaService.user.findFirst({
            where: { id: userId },
        });

        // CREATE inbox sender & receiver
        const titleSender = `Anda meresponse pemmbatalkan taaruf`;
        const titleReceiver = `${user.firstname} meresponse pemmbatalkan taaruf`;

        // get receiverId, karena yang mencancel bisa candidate maupun yang mengajukan taaruf
        const receiverId =
            taaruf.userId != userId ? userId : taaruf.candidateId;

        const messageInbox: Prisma.InboxMessageCreateInput = {
            sender: { connect: { id: userId } },
            receiver: { connect: { id: receiverId } },
            message,
            title: "",
            taaruf_process: TaarufProcess.Canceled,
            taaruf_process_id: taaruf.id,
            taaruf_process_status: ApprovalStatus.Canceled
        }
        await this.inboxService.create(userId, receiverId, taaruf.id, messageInbox, titleSender, titleReceiver);
    }

    update_taaruf_status(
        userId: string,
        candidateId: string,
        taaruf_status: TaarufStatus,
    ) {
        return this.PrismaService.user.updateMany({
            where: { id: { in: [userId, candidateId] } },
            data: {
                taaruf_status,
            },
        });
    }
}
