import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';

const select = {
    id: true,
    userId: true,
    title: true,
    createdAt: true,
    updatedAt: true,
};

@Injectable()
export class HobbiesService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
    ) { }

    async create(userId: string, data: Prisma.HobbyCreateInput) {
        return this.prisma.hobby.create({
            data: { ...data, User: { connect: { id: userId } } },
            select,
        });
    }

    async findAll(userId: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.hobby.count({
                where: { userId, deleted: false },
            }),
            this.prisma.hobby.findMany({
                where: { userId, deleted: false },
                orderBy: { createdAt: 'desc' },
                select,
                skip,
                take: Number(limit),
            }),
        ]);

        // FIXME harusnya jgn notfound
        // not found itu artinya data yg di cari tidak ada, bukan kosong
        if (data.length == 0) throw new NotFoundException(`No Data Found`);

        return {
            data,
            total,
            page: +page,
            maxPages: Math.ceil(total / limit),
            limit: +limit
        }
    }

    async findOne(userId: string, id: string) {
        const data = await this.prisma.hobby.findFirst({
            where: { id, userId, deleted: false },
            select,
        });
        if (!data) {
            // Check if the education record exists for any user
            const hobbyExist = await this.prisma.hobby.findUnique({
                where: { id, deleted: false },
            });

            // If the education record exists but does not belong to the requesting user
            if (hobbyExist) {
                throw new ForbiddenException(
                    `You dont have permission to access / on this server`,
                );
            } else {
                throw new NotFoundException(`Data Not Found`);
            }
        }
        return data;
    }

    async update(userId: string, id: string, data: UpdateHobbyDto) {
        const hobbyId = await this.findOne(userId, id);

        return this.prisma.hobby.update({
            where: { id: hobbyId.id },
            // FIXME utk apa connect user id ?
            data: { ...data, User: { connect: { id: userId } } },
            select,
        });
    }

    async remove(userId: string, id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, Hobby: true },
        });
        if (!user.Hobby.length === null)
            throw new NotFoundException(`No data found`);
        // FIXME code di atas sepertinya useless
        const hobbyId = await this.findOne(userId, id);

        return this.prisma.hobby.update({
            where: { id: hobbyId.id },
            data: { deleted: true },
        });
    }
}
