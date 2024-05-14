import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTaarufGoldDto } from './dto/create-taaruf_gold.dto';
import { UpdateTaarufGoldDto } from './dto/update-taaruf_gold.dto';
import dayjs from 'dayjs';
import { max } from 'class-validator';

@Injectable()
export class TaarufGoldService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

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
