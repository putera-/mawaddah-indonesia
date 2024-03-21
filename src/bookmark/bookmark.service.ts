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

    async findAll(id: string): Promise<Bookmark[]> {
        const bookmarks = await this.Prisma.bookmark.findMany({
            where: {
                userId: id,
            },
        });
        return bookmarks;
    }
    async findOne(id: string): Promise<Bookmark> {
        const bookmarks = await this.Prisma.bookmark.findFirst({
            where: { id },
        });
        return bookmarks;
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
