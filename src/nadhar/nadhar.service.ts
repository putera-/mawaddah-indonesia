import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { PrismaService } from 'src/prisma.service';
import { Nadhar } from './nadhar.interface';
import { ApprovalStatus, Prisma, TaarufProcess } from '@prisma/client';
import { InboxService } from 'src/inbox/inbox.service';

@Injectable()
export class NadharService {
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

    async create(data: CreateNadharDto, userId: string, taarufId: string) {
        const taaruf = await this.prisma.taaruf.findFirst({
            // nadhar bisa diajukan oleh pengaju taaruf maupun candidate
            // allow request nadhar walapupun sudah ditolak, selama taaruf belum di cancel
            where: {
                id: taarufId,
                active: true,
                status: ApprovalStatus.Approved,
                taaruf_process: {
                    in: [TaarufProcess.TaarufApproved, TaarufProcess.NadharRejected, TaarufProcess.NadharCanceled]
                }
            },
            include: {
                nadhars: true,
                khitbahs: true,
                akads: true,
            }
        });

        // cek apakah data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        // check apakah nadhar sudah disetujui atau belum
        const has_approved_nadhar = taaruf.nadhars.some(nadhar => nadhar.status == ApprovalStatus.Approved);
        if (has_approved_nadhar) throw new BadRequestException('Nadhar anda sudah disetujui.');

        //create nadhor dengan status pending
        const message = data.message || '';
        await this.prisma.nadhar.create({
            data: {
                ...data,
                Taaruf: { connect: { id: taarufId } },
                schedule: data.schedule,
                message,
                requestBy: { connect: { id: userId } },
                status: ApprovalStatus.Pending
            },
        });

        // update taaruf to Nadhar Request
        await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.NadharRequest
            }
        });

        {
            const user = await this.prisma.user.findFirst({
                where: { id: userId },
            });
            // get receiverId, karena yang mengajukanm bisa candidate maupun
            const receiverId = taaruf.userId != userId ? userId : taaruf.candidateId;

            // CREATE inbox sender & receiver
            const title = `${user.firstname} telah mengajukan permintaan nadhar`;
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
                        taaruf_process: TaarufProcess.NadharRequest
                    }
                }
            }
            await this.inboxService.create(userId, receiverId, taarufId, dataInbox);
        }

        return;
    }

    // TODO sepertinya ga perlu
    async update(id: string, data: UpdateNadharDto): Promise<Nadhar> {
        const nadhar = await this.findOne(id);

        if (!nadhar) throw new NotFoundException();

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == ApprovalStatus.Approved) throw new BadRequestException('Nadhar sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id },
            data
        })
        return result;

    }

    async cancel(userId: string, nadharId: string, message: string): Promise<Nadhar> {
        const nadhar = await this.findOne(nadharId);
        if (!nadhar) throw new NotFoundException();

        const taarufId = nadhar.taarufId;

        //check nadhar status
        if (nadhar.status == ApprovalStatus.Approved) throw new BadRequestException('Nadhar telah disetujui, tidak bisa mengubah data');
        if (nadhar.status == ApprovalStatus.Canceled) throw new BadRequestException('Nadhar telah dibatalkan, tidak bisa mengubah data');
        if (nadhar.status == ApprovalStatus.Rejected) throw new BadRequestException('Nadhar telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: userId } }
        }

        // update nahdar status with response
        await this.prisma.nadhar.update({
            where: { id: nadharId },
            data: {
                status: ApprovalStatus.Canceled,
                response: {
                    create: response
                }
            }
        });

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.TaarufApproved // back to taaruf approved
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
            const title = `${user.firstname} telah membatalkan permintaan nadhar`;
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
                        taaruf_process: TaarufProcess.NadharCanceled
                    }
                }
            }
            await this.inboxService.create(userId, receiverId, taarufId, dataInbox);
        }

        return;
    }

    async approve(userId: string, nadharId: string, message: string): Promise<void> {
        const nadhar = await this.findOne(nadharId);
        if (!nadhar) throw new NotFoundException();

        const taarufId = nadhar.taarufId;

        //check nadhar status
        if (nadhar.status == ApprovalStatus.Approved) throw new BadRequestException('Nadhar telah disetujui, tidak bisa mengubah data');
        if (nadhar.status == ApprovalStatus.Canceled) throw new BadRequestException('Nadhar telah dibatalkan, tidak bisa mengubah data');
        if (nadhar.status == ApprovalStatus.Rejected) throw new BadRequestException('Nadhar telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: userId } }
        }

        // update nahdar status with response
        await this.prisma.nadhar.update({
            where: { id: nadharId },
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
                taaruf_process: TaarufProcess.NadharApproved
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
            const title = `${user.firstname} telah menerima permintaan nadhar`;
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
                        taaruf_process: TaarufProcess.NadharApproved
                    }
                }
            }
            await this.inboxService.create(userId, receiverId, taarufId, dataInbox);
        }

        return;
    }
    async reject(userId: string, nadharId: string, message: string) {
        const nadhar = await this.findOne(nadharId);
        if (!nadhar) throw new NotFoundException();
        const taarufId = nadhar.taarufId;

        //check nadhar status
        if (nadhar.status == ApprovalStatus.Approved) throw new BadRequestException('Nadhar telah disetujui, tidak bisa mengubah data');
        if (nadhar.status == ApprovalStatus.Canceled) throw new BadRequestException('Nadhar telah dibatalkan, tidak bisa mengubah data');
        if (nadhar.status == ApprovalStatus.Rejected) throw new BadRequestException('Nadhar telah ditolak, tidak bisa mengubah data');

        const response: Prisma.ResponseCreateInput = {
            message,
            responseBy: { connect: { id: userId } }
        }

        await this.prisma.nadhar.update({
            where: { id: nadharId },
            data: {
                status: ApprovalStatus.Rejected,
                response: {
                    create: response
                }
            }
        });

        // update status taaruf
        const taaruf = await this.prisma.taaruf.update({
            where: { id: taarufId },
            data: {
                taaruf_process: TaarufProcess.NadharRejected
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
            const title = `${user.firstname} telah menolak permintaan nadhar`;
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
                        taaruf_process: TaarufProcess.NadharRejected
                    }
                }
            }
            await this.inboxService.create(userId, receiverId, taarufId, dataInbox);
        }

        return;
    }

    findOne(id: string): Promise<Nadhar> {
        return this.prisma.nadhar.findFirst({
            where: { id: id },
        });
    }
}
