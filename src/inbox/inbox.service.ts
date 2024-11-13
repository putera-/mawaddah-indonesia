import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';
import { Prisma, TaarufProcess } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class InboxService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
    ) { }

    async create(senderId: string, receiverId: string, taarufId: string, message: any, titleSender: string, titleReceiver: string): Promise<void> {

        const dataSenderInbox: Prisma.InboxCreateInput = {
            taaruf: { connect: { id: taarufId } },
            title: titleSender,
            user: { connect: { id: senderId } },
            responder: { connect: { id: receiverId } },
            read: true, // mark as read
            datetime: new Date(),
            messages: {
                create: {
                    ...message,
                    title: titleSender
                }
            }
        }
        const dataReceiverInbox: Prisma.InboxCreateInput = {
            taaruf: { connect: { id: taarufId } },
            title: titleReceiver,
            user: { connect: { id: receiverId } },
            responder: { connect: { id: senderId } },
            read: false, // mark as unread
            datetime: new Date(),
            messages: {
                create: {
                    ...message,
                    title: titleReceiver
                }
            }
        }

        await Promise.all([
            this.prisma.inbox.upsert({
                where: {
                    userId_taarufId: {
                        userId: senderId,
                        taarufId
                    }
                },
                create: dataSenderInbox,
                update: dataSenderInbox,
            }),
            this.prisma.inbox.upsert({
                where: {
                    userId_taarufId: {
                        userId: receiverId,
                        taarufId
                    }
                },
                create: dataReceiverInbox,
                update: dataReceiverInbox,
            }),
        ]);

        return;
    }

    async findAll(userId: string, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [total, total_read, total_unread, data] = await Promise.all([
            this.prisma.inbox.count({
                where: { userId },
            }),
            this.prisma.inbox.count({
                where: { userId, read: true },
            }),
            this.prisma.inbox.count({
                where: { userId, read: false },
            }),
            this.prisma.inbox.findMany({
                where: { userId },
                orderBy: { datetime: 'desc' },
                skip,
                take: limit,
                include: {
                    responder: true,
                    taaruf: true
                }
            }),
        ]);

        for (const inbox of data) {
            if (['TaarufRequest', 'TaarufRejected', 'NadharCanceled', 'KhitbahCanceled', 'AkadCanceled', 'Canceled'].includes(inbox.taaruf.taaruf_process)) {
                this.userService.formatGray(inbox.responder);
            }
        }

        const inboxes = data;

        return {
            data: inboxes,
            total_read,
            total_unread,
            total,
            page: +page,
            maxPages: Math.ceil(total / limit),
            limit: +limit,
        };
    }

    async findOne(id: string) {
        const inbox = await this.prisma.inbox.findFirst({
            where: { id },
            include: {
                messages: {
                    orderBy: { createdAt: 'desc' },
                },
                responder: true,
                taaruf: true
            }
        });

        if (!inbox) {
            throw new NotFoundException('Inbox not found');
        }

        // use blurred avatar based on  taaruf process
        if (['TaarufRequest', 'TaarufRejected', 'NadharCanceled', 'KhitbahCanceled', 'AkadCanceled', 'Canceled'].includes(inbox.taaruf.taaruf_process)) {
            this.userService.formatGray(inbox.responder);
        }

        this.markAsRead(id);
        inbox.read = true;

        return inbox;
    }

    async markAsRead(id: string) {
        return this.prisma.inbox.update({
            where: { id },
            data: { read: true },
        });
    }

    async markAsFavourite(id: string) {
        return this.prisma.inbox.update({
            where: { id },
            data: { is_favourite: true },
        });
    }

    async markUnFavourite(id: string) {
        return this.prisma.inbox.update({
            where: { id },
            data: { is_favourite: false },
        });
    }

    // update(id: number, updateInboxDto: UpdateInboxDto) {
    //     return `This action updates a #${id} inbox`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} inbox`;
    // }
}
