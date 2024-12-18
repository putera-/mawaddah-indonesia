import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';
import { UpdateKhitbahDto } from './dto/update-khitbah.dto';
import { PrismaService } from 'src/prisma.service';
import { Khitbah } from './khitbah.interface';
import { ApprovalStatus, Prisma, TaarufProcess } from '@prisma/client';
import { InboxService } from 'src/inbox/inbox.service';

@Injectable()
export class KhitbahService {
    constructor(
        private prisma: PrismaService,
        private inboxService: InboxService,
    ) { }

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

    async create(data: CreateKhitbahDto, userId: string, taarufId: string) {
        const taaruf = await this.prisma.taaruf.findFirst({
            // khitbah bisa diajukan oleh pengaju taaruf maupun candidate
            // allow request khitbah walapupun sudah ditolak, selama taaruf belum di cancel
            where: {
                id: taarufId,
                active: true,
                status: ApprovalStatus.Approved,
                taaruf_process: {
                    in: [TaarufProcess.NadharApproved, TaarufProcess.KhitbahRejected, TaarufProcess.KhitbahCanceled]
                }
            },
            include: {
                nadhars: true,
                khitbahs: true,
                akads: true,
            }
        });

        //cek apakan data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        const nadhars = taaruf.nadhars;
        if (!nadhars.length) throw new NotFoundException('Data Nadhar tidak ditemukan');

        // check apakah khitbah sudah disetujui atau belum
        const has_approved_khitbah = taaruf.khitbahs.some(khitbah => khitbah.status == ApprovalStatus.Approved);
        if (has_approved_khitbah) throw new BadRequestException('Khitbah anda sudah disetujui.');

        // create khitbah dengan status pending
        const message = data.message || '';
        const khitbahData = await this.prisma.khitbah.create({
            data: {
                ...data,
                Taaruf: { connect: { id: taarufId } },
                schedule: data.schedule,
                message,
                requestBy: { connect: { id: userId } },
                status: ApprovalStatus.Pending
            },
        });

        // update taaruf to Khitbah Request
        await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.KhitbahRequest
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
            const titleSender = `Anda telah mengajukan permintaan khitbah`;
            const titleReceiver = `${user.firstname} telah mengajukan permintaan khitbah`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.KhitbahRequest,
                taaruf_process_id: khitbahData.id,
                taaruf_process_status: ApprovalStatus.Pending
            }
            await this.inboxService.create(senderId, receiverId, taarufId, messageInbox, titleSender, titleReceiver);
        }

        return data;
    }

    // TODO Sepertinya ga perlu
    async update(id: string, data: UpdateKhitbahDto): Promise<Khitbah> {
        const khitbah = await this.findOne(id);
        if (!khitbah) throw new NotFoundException();

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (khitbah.status == ApprovalStatus.Approved) throw new BadRequestException('Khitbah sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.khitbah.update({
            where: { id: khitbah.id },
            data: {
                schedule: data.schedule
            }
        })
        return result;
    }

    async cancel(userId: string, khitbahId: string, message: string) {
        const khitbah = await this.findOne(khitbahId);
        if (!khitbah) throw new NotFoundException();

        const taarufId = khitbah.taarufId;

        //check nadhar status
        if (khitbah.status == ApprovalStatus.Approved) throw new BadRequestException('Khitbah telah disetujui, tidak bisa mengubah data');
        if (khitbah.status == ApprovalStatus.Canceled) throw new BadRequestException('Khitbah telah dibatalkan, tidak bisa mengubah data');
        if (khitbah.status == ApprovalStatus.Rejected) throw new BadRequestException('Khitbah telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: userId } }
        }

        await this.prisma.khitbah.update({
            where: { id: khitbahId },
            data: {
                status: ApprovalStatus.Rejected,
                response: {
                    create: response
                }
            }
        })

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.NadharApproved // back to nadhar approved
            }
        });

        // update previous messsage
        await this.prisma.inboxMessage.updateMany({
            where: { taaruf_process_id: khitbahId },
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
            const titleSender = `Anda telah membatalkan permintaan khitbah`;
            const titleReceiver = `${user.firstname} telah membatalkan permintaan khitbah`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.KhitbahCanceled,
                taaruf_process_id: khitbah.id,
                taaruf_process_status: ApprovalStatus.Canceled
            }
            await this.inboxService.create(senderId, receiverId, taarufId, messageInbox, titleSender, titleReceiver);
        }

        return;
    }

    async approve(userId: string, khitbahId: string, message: string) {
        const khitbah = await this.findOne(khitbahId);
        if (!khitbah) throw new NotFoundException();

        const taarufId = khitbah.taarufId;

        //check khitbah status
        if (khitbah.status == ApprovalStatus.Approved) throw new BadRequestException('Khitbah telah disetujui, tidak bisa mengubah data');
        if (khitbah.status == ApprovalStatus.Canceled) throw new BadRequestException('Khitbah telah dibatalkan, tidak bisa mengubah data');
        if (khitbah.status == ApprovalStatus.Rejected) throw new BadRequestException('Khitbah telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            // : { connect: { id: khitbahId } },
            message,
            responseBy: { connect: { id: userId } }
        }

        await this.prisma.khitbah.update({
            where: { id: khitbah.id },
            data: {
                status: ApprovalStatus.Approved,
                response: {
                    create: response
                }
            }
        });

        // update previous messsage
        await this.prisma.inboxMessage.updateMany({
            where: { taaruf_process_id: khitbahId },
            data: {
                taaruf_process_status: ApprovalStatus.Approved,
            }
        });

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.KhitbahApproved
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
            const titleSender = `Anda telah menerima permintaan khitbah`;
            const titleReceiver = `${user.firstname} telah menerima permintaan khitbah`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.KhitbahApproved,
                taaruf_process_id: khitbah.id,
                taaruf_process_status: ApprovalStatus.Approved
            }
            await this.inboxService.create(senderId, receiverId, taarufId, messageInbox, titleSender, titleReceiver);
        }

        return;
    }

    async reject(userId: string, khitbahId: string, message: string) {
        const khitbah = await this.findOne(khitbahId);

        if (!khitbah) throw new NotFoundException();
        const taarufId = khitbah.taarufId;

        //check khitbah status
        if (khitbah.status == ApprovalStatus.Approved) throw new BadRequestException('Khitbah telah disetujui, tidak bisa mengubah data');
        if (khitbah.status == ApprovalStatus.Canceled) throw new BadRequestException('Khitbah telah dibatalkan, tidak bisa mengubah data');
        if (khitbah.status == ApprovalStatus.Rejected) throw new BadRequestException('Khitbah telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: userId } }
        }

        await this.prisma.khitbah.update({
            where: { id: khitbah.id },
            data: {
                status: ApprovalStatus.Rejected,
                response: {
                    create: response
                }
            }
        })

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.KhitbahRejected
            }
        });

        // update previous messsage
        await this.prisma.inboxMessage.updateMany({
            where: { taaruf_process_id: khitbahId },
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
            const titleSender = `Anda telah menolak permintaan khitbah`;
            const titleReceiver = `${user.firstname} telah menolak permintaan khitbah`;

            const messageInbox: Prisma.InboxMessageCreateInput = {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message,
                title: "",
                taaruf_process: TaarufProcess.KhitbahRejected,
                taaruf_process_id: khitbah.id,
                taaruf_process_status: ApprovalStatus.Rejected
            }
            await this.inboxService.create(senderId, receiverId, taarufId, messageInbox, titleSender, titleReceiver);
        }

        return;
    }

    findOne(id: string): Promise<Khitbah> {
        return this.prisma.khitbah.findFirst({
            where: { id: id },
        });
    }
}
