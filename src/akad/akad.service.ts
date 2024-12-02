import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';
import { PrismaService } from 'src/prisma.service';
import { Akad } from './akad.interface';
import { ApprovalStatus, Prisma, TaarufProcess } from '@prisma/client';
import { InboxService } from 'src/inbox/inbox.service';

@Injectable()
export class AkadService {
    constructor(
        private prisma: PrismaService,
        private inboxService: InboxService,
    ) { }

    // for maintainance only
    async getAll(userId: string) {
        return await this.prisma.taaruf.findMany({
            where: { userId },
            include: {
                nadhars: true,
                khitbahs: true,
                akads: true,
            }
        });
    }

    async create(data: CreateAkadDto, userId: string, taarufId: string) {
        const taaruf = await this.prisma.taaruf.findFirst({
            // akad bisa diajukan oleh pengaju taaruf maupun candidate
            // allow request akad walapupun sudah ditolak, selama taaruf belum di cancel
            where: {
                id: taarufId,
                active: true,
                status: ApprovalStatus.Approved,
                taaruf_process: {
                    in: [TaarufProcess.KhitbahApproved, TaarufProcess.AkadRejected, TaarufProcess.AkadCanceled]
                }
            },
            include: {
                nadhars: true,
                khitbahs: true,
                akads: true
            },
        });


        //cek apakan data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        const nadhars = taaruf.nadhars;
        if (!nadhars.length) throw new NotFoundException('Data Nadhar tidak ditemukan');

        const khitbahs = taaruf.khitbahs;
        if (!khitbahs.length) throw new NotFoundException('Data Khitbah tidak ditemukan');

        // check apakah akad sudah disetujui atau belum
        const has_approved_akad = taaruf.akads.some(akad => akad.status == ApprovalStatus.Approved);
        if (has_approved_akad) throw new BadRequestException('Akad anda sudah disetujui.');

        // create akad dengan status pending
        const message = data.message || '';
        const akadData = await this.prisma.akad.create({
            data: {
                ...data,
                Taaruf: { connect: { id: taarufId } },
                schedule: data.schedule,
                message,
                requestBy: { connect: { id: userId } },
                status: ApprovalStatus.Pending,
            },
        });

        // update taaruf to Akad Request
        await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.AkadRequest
            }
        });

        {
            const user = await this.prisma.user.findFirst({
                where: { id: userId },
            });
            // get receiverId, karena yang mengajukanm bisa candidate maupun
            const senderId = userId;
            const receiverId = taaruf.userId == senderId ? taaruf.candidateId : taaruf.userId;

            // CREATE inbox sender & receiver
            const titleSender = `Anda telah mengajukan permintaan akad`;
            const titleReceiver = `${user.firstname} telah mengajukan permintaan akad`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.AkadRequest,
                taaruf_process_id: akadData.id,
                taaruf_process_status: ApprovalStatus.Pending
            }
            await this.inboxService.create(senderId, receiverId, taarufId, messageInbox, titleSender, titleReceiver);
        }

        return;
    }

    // TODO mungkin akan di hapus
    async update(id: string, data: UpdateAkadDto) {
        const akad = await this.prisma.akad.findFirst({
            where: { id },
        })
        //check if akad was approved, if (approved) => not allowed to update/change data
        if (akad.status == ApprovalStatus.Approved)
            throw new BadRequestException(
                'Akad sudah disetujui, tidak bisa mengubah data',
            );

        const result = await this.prisma.akad.update({
            where: { id: akad.id },
            data: {
                schedule: data.schedule,
            },
        });
        return result;
    }

    async cancel(userId: string, akadId: string, message: string) {
        const akad = await this.findOne(akadId);
        if (!akad) throw new NotFoundException();

        const taarufId = akad.taarufId;

        //check akad status
        if (akad.status == ApprovalStatus.Approved) throw new BadRequestException('Akad telah disetujui, tidak bisa mengubah data');
        if (akad.status == ApprovalStatus.Canceled) throw new BadRequestException('Akad telah dibatalkan, tidak bisa mengubah data');
        if (akad.status == ApprovalStatus.Rejected) throw new BadRequestException('Akad telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: userId } }
        }

        await this.prisma.akad.update({
            where: { id: akad.id },
            data: {
                status: ApprovalStatus.Rejected,
                response: {
                    create: response
                }
            },
        });

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.KhitbahApproved // back to khitbah approved
            }
        });

        // update previous messsage
        await this.prisma.inboxMessage.updateMany({
            where: { taaruf_process_id: akadId },
            data: {
                taaruf_process_status: ApprovalStatus.Canceled,
            }
        });

        // create inbox
        {
            const user = await this.prisma.user.findFirst({
                where: { id: userId },
            });

            // get receiverId, karena yang mengajukanm bisa candidate maupun
            const senderId = userId;
            const receiverId = taaruf.userId == senderId ? taaruf.candidateId : taaruf.userId;

            // CREATE inbox sender & receiver
            const titleSender = `Anda telah membatalkan permintaan akad`;
            const titleReceiver = `${user.firstname} telah membatalkan permintaan akad`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.AkadCanceled,
                taaruf_process_id: akad.id,
                taaruf_process_status: ApprovalStatus.Canceled
            }

            await this.inboxService.create(senderId, receiverId, taarufId, messageInbox, titleSender, titleReceiver);
        }

        return;
    }

    async approve(userId: string, akadId: string, message: string) {
        const akad = await this.findOne(akadId);
        if (!akad) throw new NotFoundException();

        const taarufId = akad.taarufId;

        //check akad status
        if (akad.status == ApprovalStatus.Approved) throw new BadRequestException('Akad telah disetujui, tidak bisa mengubah data');
        if (akad.status == ApprovalStatus.Canceled) throw new BadRequestException('Akad telah dibatalkan, tidak bisa mengubah data');
        if (akad.status == ApprovalStatus.Rejected) throw new BadRequestException('Akad telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: userId } }
        }

        await this.prisma.akad.update({
            where: { id: akad.id },
            data: {
                status: ApprovalStatus.Approved,
                response: {
                    create: response
                }
            },
        });

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.AkadApproved
            }
        });

        // update previous messsage
        await this.prisma.inboxMessage.updateMany({
            where: { taaruf_process_id: akadId },
            data: {
                taaruf_process_status: ApprovalStatus.Approved,
            }
        });

        // create inbox
        {
            const user = await this.prisma.user.findFirst({
                where: { id: userId },
            });

            // get receiverId, karena yang mengajukanm bisa candidate maupun
            const senderId = userId;
            const receiverId = taaruf.userId == senderId ? taaruf.candidateId : taaruf.userId;

            // CREATE inbox sender & receiver
            const titleSender = `Anda telah menerima permintaan akad`;
            const titleReceiver = `${user.firstname} telah menerima permintaan akad`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.AkadApproved,
                taaruf_process_id: akad.id,
                taaruf_process_status: ApprovalStatus.Approved
            }

            await this.inboxService.create(senderId, receiverId, taarufId, messageInbox, titleSender, titleReceiver);
        }

        return;
    }

    async reject(userId: string, akadId: string, message: string) {
        const akad = await this.findOne(akadId);

        if (!akad) throw new NotFoundException();
        const taarufId = akad.taarufId;

        //check akad status
        if (akad.status == ApprovalStatus.Approved) throw new BadRequestException('Akad telah disetujui, tidak bisa mengubah data');
        if (akad.status == ApprovalStatus.Canceled) throw new BadRequestException('Akad telah dibatalkan, tidak bisa mengubah data');
        if (akad.status == ApprovalStatus.Rejected) throw new BadRequestException('Akad telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: userId } }
        }

        await this.prisma.akad.update({
            where: { id: akad.id },
            data: {
                status: ApprovalStatus.Rejected,
                response: {
                    create: response
                }
            },
        });

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.AkadRejected
            }
        });

        // update previous messsage
        await this.prisma.inboxMessage.updateMany({
            where: { taaruf_process_id: akadId },
            data: {
                taaruf_process_status: ApprovalStatus.Rejected,
            }
        });

        // create inbox
        {
            const user = await this.prisma.user.findFirst({
                where: { id: userId },
            });

            // get receiverId, karena yang mengajukanm bisa candidate maupun
            const senderId = userId;
            const receiverId = taaruf.userId == senderId ? taaruf.candidateId : taaruf.userId;

            // CREATE inbox sender & receiver
            const titleSender = `Anda telah menolak permintaan akad`;
            const titleReceiver = `${user.firstname} telah menolak permintaan akad`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.AkadRejected,
                taaruf_process_id: akad.id,
                taaruf_process_status: ApprovalStatus.Rejected
            }

            await this.inboxService.create(senderId, receiverId, taarufId, messageInbox, titleSender, titleReceiver);
        }

        return;
    }

    findOne(id: string): Promise<Akad> {
        return this.prisma.akad.findFirst({
            where: { id },
        });
    }
}
