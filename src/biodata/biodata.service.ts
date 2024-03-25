import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';

const select = {
    bio: true,
    phone: true,
    manhaj: true,
    gender: true,
    marriage_status: true,
    marriage_permission: true,
    dob: true,
    birth_place: true,
    birth_order: true,
    domicile_town: true,
    domicile_province: true,
    hometown_province: true,
    ethnic: true,
};

@Injectable()
export class BiodataService {
    constructor(
        private readonly userService: UsersService,
        private Prisma: PrismaService,
    ) {}

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

    findMe(id: string) {
        return this.Prisma.biodata.findFirst({
            where: {
                userId: id,
            },
            select: { ...select },
        });
    }

    update(id: string, data: Prisma.BiodataCreateInput) {
        return this.Prisma.biodata.update({ where: { userId: id }, data });
    }
}
