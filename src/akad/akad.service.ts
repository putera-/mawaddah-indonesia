import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';
import { PrismaService } from 'src/prisma.service';
import { Akad } from './akad.interface';

@Injectable()
export class AkadService {
    constructor(private prisma: PrismaService) { }

    // for maintainance only
    // async getAll(userId: string) {
    //     return await this.prisma.taaruf.findMany({
    //         where: { userId },
    //         include: {
    //             approval: true,
    //             khitbahs: true,
    //             akads: true,
    //         }
    //     });
    // }

    async create(data: CreateAkadDto, userId: string, taarufid: string) {
        const target = await this.prisma.taaruf.findFirst({
            //supaya hanya mendapatkan punya user dan yang status approved
            where: {
                id: taarufid,
                userId: userId,
                approval: { status: 'Yes' },
            },
            include: { approval: true, nadhars: true, khitbahs: true },
        });

        const taaruf = await this.prisma.taaruf.findFirst({
            where: { id: taarufid, khitbahs: { some: { status: 'Yes' } } },
            include: { khitbahs: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
        });

        //cek apakan data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        const khitbahs = taaruf.khitbahs;
        if (!khitbahs.length) throw new NotFoundException();

        // create khitbah dengan status pending
        await this.prisma.akad.create({
            data: {
                ...data,
                Taaruf: { connect: { id: target.id } },
                schedule: data.schedule,
                message: data.message || '',
                reply: data.reply || '',
                status: 'Pending',
            },
        });
        return data;
    }

    async update(id: string, data: UpdateAkadDto) {
        const akad = await this.prisma.akad.findFirst({
            where: { id },
        })
        //check if akad was approved, if (approved) => not allowed to update/change data
        if (akad.status == 'Yes')
            throw new BadRequestException(
                'akad sudah disetujui, tidak bisa mengubah data',
            );

        const result = await this.prisma.akad.update({
            where: { id: akad.id },
            data: {
                schedule: data.schedule,
            },
        });
        return result;
    }

    async cancel(id: string) {
        const akad = await this.prisma.akad.findFirst({
            where: { id },
        });

        //check if akad was approved, if (approved) => not allowed to update/change data
        if (akad.status == 'Yes')
            throw new BadRequestException(
                'akad sudah disetujui, tidak bisa mengubah data',
            );

        const result = await this.prisma.akad.update({
            where: { id: akad.id },
            data: {
                status: 'No',
            },
        });
        return result;
    }

    async approve(id: string) {
        const akad = await this.prisma.akad.findFirst({
            where: { id },
        })

        //check if akad was approved, if (approved) => not allowed to update/change data
        if (akad.status == 'No')
            throw new BadRequestException(
                'akad sudah ditolak, tidak bisa mengubah data',
            );

        const result = await this.prisma.akad.update({
            where: { id: akad.id },
            data: {
                status: 'Yes',
            },
        });
        return result;
    }

    async reject(id: string) {
        const akad = await this.prisma.akad.findFirst({
            where: { id },
        })
        //check if akad was approved, if (approved) => not allowed to update/change data
        if (akad.status == 'Yes')
            throw new BadRequestException(
                'akad sudah disetujui, tidak bisa mengubah data',
            );

        const result = await this.prisma.akad.update({
            where: { id: akad.id },
            data: {
                status: 'No',
            },
        });
        return result;
    }

    findOne(id: string): Promise<Akad> {
        return this.prisma.akad.findFirst({
            where: { id },
        });
    }
}
