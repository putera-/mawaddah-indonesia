import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class BiodataService {
    constructor(
        private readonly userService: UsersService,
        private Prisma: PrismaService,
    ) { }

    async create(id: string, data: Prisma.BiodataCreateInput) {
        const result = await this.Prisma.biodata.create({
            data: {
                ...data,
                user: {
                    connect: { id },
                },
            },
        });
        await this.Prisma.user.update({
            where: { id },
            data: { taaruf_status: 'OPEN' },
        });
        return result;
    }

    findMe(userId: string) {
        return this.Prisma.biodata.findFirst({
            where: { userId }
        });
    }

    update(id: string, data: Prisma.BiodataCreateInput) {
        return this.Prisma.biodata.update({ where: { userId: id }, data });
    }
}
