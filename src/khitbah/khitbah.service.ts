import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';
import { UpdateKhitbahDto } from './dto/update-khitbah.dto';
import { PrismaService } from 'src/prisma.service';
import { Khitbah } from './khitbah.interface';

@Injectable()
export class KhitbahService {
    constructor(private prisma: PrismaService) { }

    // for maintainance only
    // async getAll(userId: string) {
    //     return await this.prisma.taaruf.findMany({
    //         where: { userId },
    //         include: {
    //             approval: true,
    //             khitbahs: true,
    //             nadhars: true
    //         }
    //     });
    // }

    async create(data: CreateKhitbahDto, userId: string, id: string) {
        const target = await this.prisma.taaruf.findFirst({
            //supaya hanya mendapatkan punya user dan yang status approved
            where: { id: id, userId: userId, approval: { status: 'Yes' } },
            include: {
                approval: true,
                nadhars: true
            }
        });

        const taaruf = await this.prisma.taaruf.findFirst({
            where: { id: id, nadhars: { some: { status: 'Yes' } } },
            include: { nadhars: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
        });

        //cek apakan data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        const nadhars = taaruf.nadhars;
        if (!nadhars.length) throw new NotFoundException();

        // create khitbah dengan status pending
        await this.prisma.khitbah.create({
            data: {
                ...data,
                Taaruf: { connect: { id: target.id } },
                schedule: data.schedule,
                message: data.message || '',
                reply: data.reply || '',
                status: 'Pending'
            },
        });
        return data;
    }

    async update(id: string, data: UpdateKhitbahDto): Promise<Khitbah> {
        const khitbah = await this.findOne(id);

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (khitbah.status == 'Yes') throw new BadRequestException('Khitbah sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.khitbah.update({
            where: { id: khitbah.id },
            data: {
                schedule: data.schedule
            }
        })
        return result;
    }

    async cancel(id: string) {
        const khitbah = await this.findOne(id);

        //check if khitbah was approved, if (approved) => not allowed to update/change data
        if (khitbah.status == 'Yes') throw new BadRequestException('khitbah sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.khitbah.update({
            where: { id: khitbah.id },
            data: {
                status: 'No'
            }
        })
        return result;
    }

    async approve(id: string) {
        const khitbah = await this.findOne(id);

        //check if khitbah was approved, if (approved) => not allowed to update/change data
        if (khitbah.status == 'No') throw new BadRequestException('khitbah sudah ditolak, tidak bisa mengubah data');

        const result = await this.prisma.khitbah.update({
            where: { id: khitbah.id },
            data: {
                status: 'Yes'
            }
        })
        return result;
    }

    async reject(id: string) {
        const khitbah = await this.findOne(id);

        //check if khitbah was approved, if (approved) => not allowed to update/change data
        if (khitbah.status == 'Yes') throw new BadRequestException('khitbah sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.khitbah.update({
            where: { id: khitbah.id },
            data: {
                status: 'No'
            }
        })
        return result;
    }

    findOne(id: string): Promise<Khitbah> {
        return this.prisma.khitbah.findFirst({
            where: { id: id },
        });
    }


}
