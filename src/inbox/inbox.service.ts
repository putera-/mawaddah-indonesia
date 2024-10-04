import { Injectable } from '@nestjs/common';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Inbox } from './inbox.interace';

@Injectable()
export class InboxService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(senderId: string, receiverId: string, data: Prisma.InboxCreateWithoutUserInput): Promise<void> {

        const dataSenderInbox: Prisma.InboxCreateInput = {
            ...data,
            user: { connect: { id: senderId } },
            read: true, // mark as read
        }
        const dataReceiverInbox: Prisma.InboxCreateInput = {
            ...data,
            user: { connect: { id: receiverId } },
            read: false, // mark as unread
        }

        await Promise.all([
            this.prisma.inbox.create({ data: dataSenderInbox }),
            this.prisma.inbox.create({ data: dataReceiverInbox })
        ]);

        return;
    }

    async findAll(userId: string, page = 1, limit = 10): Promise<Pagination<Inbox[]>> {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.inbox.count({
                where: { userId },
            }),
            this.prisma.inbox.findMany({
                where: { userId },
                orderBy: { datetime: 'asc' },
                skip,
                take: limit,
            }),
        ]);

        const inboxes = data as Inbox[];

        return {
            data: inboxes,
            total,
            page: +page,
            maxPages: Math.ceil(total / limit),
            limit: +limit,
        };
    }

    findOne(id: string) {
        // TODO hide foto candidate
        return this.prisma.inbox.findFirst({
            where: { id },
            include: {
                messages: true,
                user: true,
                taaruf: true
            }
        });
    }

    // update(id: number, updateInboxDto: UpdateInboxDto) {
    //     return `This action updates a #${id} inbox`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} inbox`;
    // }
}
