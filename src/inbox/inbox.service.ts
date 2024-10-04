import { Injectable } from '@nestjs/common';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InboxService {
    constructor(
        private PrismaService: PrismaService,
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
            this.PrismaService.inbox.create({ data: dataSenderInbox }),
            this.PrismaService.inbox.create({ data: dataReceiverInbox })
        ]);

        return;
    }

    findAll() {
        return `This action returns all inbox`;
    }

    findOne(id: number) {
        return `This action returns a #${id} inbox`;
    }

    update(id: number, updateInboxDto: UpdateInboxDto) {
        return `This action updates a #${id} inbox`;
    }

    remove(id: number) {
        return `This action removes a #${id} inbox`;
    }
}
