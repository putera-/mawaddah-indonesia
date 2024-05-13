import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import dayjs from 'dayjs';
import { max } from 'class-validator';
import { Taaruf_gold } from './taaruf_gold.interface';

@Injectable()
export class TaarufGoldService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }
    async create(userId: string): Promise<Taaruf_gold> {

        const dataTaaruf: Prisma.Taaruf_goldCreateInput = {
            user: { connect: { id: userId, } },
            Payment: {
                create: { user: { connect: { id: userId } }, gross_amount: 100000 }
            }

        }
        const data = await this.prismaService.taaruf_gold.create({
            data: dataTaaruf,
            include: {
                Payment: true
            }
        })
        return data;
    }

    async update(paymentId: string) {

        const endDate = dayjs().add(1, "month").toISOString()

        const taaruf_gold = await this.prismaService.taaruf_gold.findFirst({
            where: {
                Payment: { id: paymentId }
            },
        });

        const data = await this.prismaService.taaruf_gold.update({
            where: { id: taaruf_gold.id },
            data: { startedAt: new Date(), endingAt: endDate },
        });
        return data;
    }



    async findAllActiveUser(page = 1, limit = 10) {
        //find user by their payment status (taaruf_gold active membership status & membership activeness)
        const skip = (page - 1) * limit;
        const data = await this.prismaService.taaruf_gold.findMany({
            where: {
                OR: [
                    {
                        startedAt: { lte: dayjs().add(30, 'days').toISOString() },
                    },
                    {
                        Payment: {
                            status: 'settlement'
                        }
                    },
                ]
            },
            include: {
                Payment: true,
                user: true
            },
            skip,
            take: +limit,
        });

        const total = await this.prismaService.taaruf_gold.count({
            where: {
                OR: [
                    {
                        startedAt: { lte: dayjs().add(30, 'days').toISOString() },
                    },
                    {
                        Payment: {
                            status: 'settlement'
                        }
                    },
                ]
            }
        });

        const maxPages = Math.ceil(total / limit);
        const Page = page;
        const pagesLeft = maxPages - Page;

        return {
            total,
            Page: +page,
            maxPages,
            limit: +limit,
            data,

        };
    }

    async findAllInActiveUser(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const data = await this.prismaService.taaruf_gold.findMany({
            where: {
                OR: [
                    {
                        startedAt: { gte: dayjs().subtract(30, 'days').toISOString() },
                    },
                    {
                        startedAt: null
                    },
                ]
            },
            include: {
                Payment: true,
                user: true
            },
            skip,
            take: +limit,
        });

        const total = await this.prismaService.taaruf_gold.count({
            where: {
                OR: [
                    {
                        startedAt: { gte: dayjs().subtract(30, 'days').toISOString() },
                    },
                    {
                        startedAt: null
                    },
                ]
            }
        });

        const maxPages = Math.ceil(total / limit);
        const Page = page;
        const pagesLeft = maxPages - Page;

        return {
            total,
            Page: +page,
            maxPages,
            limit: +limit,
            data,
        };
    }


    findOne(id: string) {
        return `This action returns a #${id} taarufGold`;
    }

    //   create(createTaarufGoldDto: CreateTaarufGoldDto) {
    //     return 'This action adds a new taarufGold';
    //   }


    //   update(id: number, updateTaarufGoldDto: UpdateTaarufGoldDto) {
    //     return `This action updates a #${id} taarufGold`;
    //   }

    //   remove(id: number) {
    //     return `This action removes a #${id} taarufGold`;
    //   }
}
