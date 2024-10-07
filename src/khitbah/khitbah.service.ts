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
        await this.prisma.khitbah.create({
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
            const receiverId = taaruf.userId != userId ? userId : taaruf.candidateId;

            // CREATE inbox sender & receiver
            const title = `${user.firstname} telah mengajukan permintaan khitbah`;
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taarufId } },
                title,
                datetime: new Date(),
                messages: {
                    create: {
                        sender: { connect: { id: userId } },
                        receiver: { connect: { id: receiverId } },
                        message,
                        title,
                        taaruf_process: TaarufProcess.KhitbahRequest
                    }
                }
            }
            await this.inboxService.create(userId, receiverId, taarufId, dataInbox);
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
                taaruf_process: TaarufProcess.NadharApproved // back to nadhar approved
            }
        });

        // create inbox
        {
            const user = await this.prisma.user.findFirst({
                where: { id: userId },
            });

            // get receiverId, karena yang mengajukanm bisa candidate maupun
            const receiverId = taaruf.userId != userId ? userId : taaruf.candidateId;

            // CREATE inbox sender & receiver
            const title = `${user.firstname} telah membatalkan permintaan khitbah`;
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taarufId } },
                title,
                datetime: new Date(),
                messages: {
                    create: {
                        sender: { connect: { id: userId } },
                        receiver: { connect: { id: receiverId } },
                        message,
                        title,
                        taaruf_process: TaarufProcess.KhitbahCanceled
                    }
                }
            }
            await this.inboxService.create(userId, receiverId, taarufId, dataInbox);
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

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.KhitbahAppproved
            }
        });

        // create inbox
        {
            const user = await this.prisma.user.findFirst({
                where: { id: userId },
            });

            // get receiverId, karena yang mengajukanm bisa candidate maupun
            const receiverId = taaruf.userId != userId ? userId : taaruf.candidateId;


            // CREATE inbox sender & receiver
            const title = `${user.firstname} telah menerima permintaan khitbah`;
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taarufId } },
                title,
                datetime: new Date(),
                messages: {
                    create: {
                        sender: { connect: { id: userId } },
                        receiver: { connect: { id: receiverId } },
                        message,
                        title,
                        taaruf_process: TaarufProcess.KhitbahAppproved
                    }
                }
            }
            await this.inboxService.create(userId, receiverId, taarufId, dataInbox);
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

        // create inbox
        {
            const user = await this.prisma.user.findFirst({
                where: { id: userId },
            });

            // get receiverId, karena yang mengajukanm bisa candidate maupun
            const receiverId = taaruf.userId != userId ? userId : taaruf.candidateId;


            // CREATE inbox sender & receiver
            const title = `${user.firstname} telah menolak permintaan khitbah`;
            const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                taaruf: { connect: { id: taarufId } },
                title,
                datetime: new Date(),
                messages: {
                    create: {
                        sender: { connect: { id: userId } },
                        receiver: { connect: { id: receiverId } },
                        message,
                        title,
                        taaruf_process: TaarufProcess.KhitbahRejected
                    }
                }
            }
            await this.inboxService.create(userId, receiverId, taarufId, dataInbox);
        }

        return;
    }

    findOne(id: string): Promise<Khitbah> {
        return this.prisma.khitbah.findFirst({
            where: { id: id },
        });
    }
}
