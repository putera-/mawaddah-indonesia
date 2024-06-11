import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePhysicalCharDto } from './dto/update-physical_char.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma, TaarufStatus } from '@prisma/client';

const select = {
    id: true,
    body_shape: true,
    skin_color: true,
    hair_type: true,
    hair_color: true,
    eye_color: true,
    characteristic: true,
    characteristic_detail: true,
    medical_history: true,
    medical_history_detail: true,
}

@Injectable()
export class PhysicalCharsService {
    constructor(private prisma: PrismaService, private userService: UsersService) { }

    async create(userId: string, data: Prisma.PhysicalCharacterCreateInput) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, taaruf_status: true },
        });

        if (user.taaruf_status !== TaarufStatus.OPEN) throw new ForbiddenException(`Taaruf is not open or pending`);

        return this.prisma.physicalCharacter.create({
            data: { ...data, Biodata: { connect: { userId } } },
            select
        });
    }

    async findAll(userId: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.physicalCharacter.count({
                where: { Biodata: { userId }, deleted: false },
            }),
            this.prisma.physicalCharacter.findMany({
                where: { Biodata: { userId }, deleted: false },
                orderBy: { createdAt: 'desc' },
                select,
                skip,
                take: Number(limit),
            }),
        ]);

        return {
            data,
            total,
            page: +page,
            maxPages: Math.ceil(total / limit),
            limit: +limit
        }
    }

    async findOne(userId: string, id: string) {
        const data = await this.prisma.physicalCharacter.findFirst({ where: { id, Biodata: { userId }, deleted: false }, select });
        if (!data) {
            // Check if the education record exists for any user
            const phyExist = await this.prisma.physicalCharacter.findUnique({ where: { id, deleted: false } });

            // If the education record exists but does not belong to the requesting user
            if (phyExist) {
                throw new ForbiddenException(`You dont have permission to access / on this server`);
            } else {
                throw new NotFoundException(`Data Not Found`);
            }
        };
        return data;
    }

    async update(userId: string, id: string, data: UpdatePhysicalCharDto) {
        const phyId = await this.findOne(userId, id);

        return this.prisma.physicalCharacter.update({
            where: { id: phyId.id },
            data: { ...data },
            select
        });
    }

    async remove(userId: string, id: string) {
        const phyId = await this.findOne(userId, id);

        return this.prisma.physicalCharacter.update({
            where: { id: phyId.id },
            data: { deleted: true }
        });
    }
}
