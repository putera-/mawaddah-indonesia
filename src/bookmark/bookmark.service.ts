import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class BookmarkService {
    constructor(
        private readonly userService: UsersService,
        private Prisma: PrismaService,
    ) {}
    async create(idUser: string, idCandidate: string) {
        const user = await this.userService.findOne(idUser, 'MEMBER');
        const candidate = await this.userService.findOne(idCandidate, 'MEMBER');
        const exist = await this.Prisma.bookmark.findFirst({
            where: {
                userId: idUser,
                candidateId: idCandidate,
            },
        });

        if (exist) {
            const id = exist.id;
            return await this.Prisma.bookmark.update({
                where: {
                    id,
                },
                data: { bookmarked: true },
            });
        } else {
            return await this.Prisma.bookmark.create({
                data: {
                    user: { connect: { id: idUser } },
                    candidate: { connect: { id: idCandidate } },
                },
            });
        }
    }

    async findAll(
        id: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<Pagination<Bookmark[]>> {
        const skip = (page - 1) * limit;

        const [total, data] = await Promise.all([
            this.Prisma.bookmark.count({
                where: { userId: id },
            }),
            this.Prisma.bookmark.findMany({
                where: { userId: id },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit),
                include: {
                    candidate: {
                        include: {
                            biodata: true,
                        },
                    },
                },
            }),
        ]);

        for (const bookmark of data) {
            const candidate = bookmark.candidate;
            this.userService.formatGray(candidate);
        }

        return {
            page: +page,
            limit: +limit,
            maxPages: Math.ceil(total / limit),
            total,
            data,
        };
    }
    async findOne(id: string): Promise<Bookmark> {
        const bookmarks = await this.Prisma.bookmark.findFirst({
            where: { id },
        });
        if (!bookmarks) {
            throw new NotFoundException('Bookmark tidak ditemukan');
        }
        return bookmarks;
    }

    async isBookmarked(idUser: string, idCandidate: string): Promise<boolean> {
        const bookmark = await this.Prisma.bookmark.findFirst({
            where: {
                userId: idUser,
                candidateId: idCandidate,
            },
        });
        return bookmark ? true : false;
    }

    async remove(id: string) {
        return await this.Prisma.bookmark.update({
            where: { id },
            data: {
                bookmarked: false,
            },
        });
    }
}
