import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NadharService {
    constructor(private prisma: PrismaService) { }

    async getAll(userId: string) {
        return this.prisma.taaruf.findMany({
            where: { userId: userId },
            include: { approval: true }
        });
    }
    
    async create(data: CreateNadharDto, userId: string, taarufid: string) {
        const target = await this.prisma.taaruf.findFirst({
            //supaya hanya mendapatkan punya user dan yang status approved
            where: { id: taarufid, userId: userId, approval: { status: 'Yes' } },
            include: { approval: true }
        });
        
        //cek apakan data taaruf ada apa tidak
        if (!target) throw new NotFoundException('Data taaruf tidak ditemukan');
        

        //memastikan taaruf sudah disetujui
        if (target.approval.status != 'Yes') throw new BadRequestException('Taaruf belum disetujui');

        //create nadhor dengan status pending
        await this.prisma.nadhar.create({
            data: {
                ...data,
                Taaruf: { connect: { id: taarufid } },
                schedule: data.schedule,
                message: data.message || '',
                reply: data.reply || '',
                status: 'Pending'
            },
        });
        return data;
    }

    async updateDate(taarufId: string, data: UpdateNadharDto) {
        const taaruf = await this.prisma.taaruf.findFirst({
            where: { id: taarufId },
            include: { nadhars: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
        });

        //cek apakan data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');
        
        const nadhars = taaruf.nadhars;
        if (!nadhars.length) throw new NotFoundException();
        const nadhar = nadhars[0];

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == 'Yes') throw new BadRequestException('Nadhar sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id: nadhar.id },
            data: {
                schedule: data.schedule
            }
        })
        return result;

    }

    async cancel(taarufId: string) {
        const taaruf = await this.prisma.taaruf.findFirst({
            where: { id: taarufId },
            include: { nadhars: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
        });

        //cek apakan data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        const nadhars = taaruf.nadhars;
        if (!nadhars.length) throw new NotFoundException();
        const nadhar = nadhars[0];

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == 'Yes') throw new BadRequestException('Nadhar sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id: nadhar.id },
            data: {
                status: 'No'
            }
        })
        return result;
    }

    async approve(taarufId: string) {
        const taaruf = await this.prisma.taaruf.findFirst({
            where: { id: taarufId },
            include: { nadhars: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
        });

        //cek apakan data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        const nadhars = taaruf.nadhars;
        if (!nadhars.length) throw new NotFoundException();
        const nadhar = nadhars[0];

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == 'No') throw new BadRequestException('Nadhar sudah ditolak, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id: nadhar.id },
            data: {
                status: 'Yes'
            }
        })
        return result;
    }
    async reject(taarufId: string) {
        const taaruf = await this.prisma.taaruf.findFirst({
            where: { id: taarufId },
            include: { nadhars: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
        });

        //cek apakan data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        const nadhars = taaruf.nadhars;
        if (!nadhars.length) throw new NotFoundException();
        const nadhar = nadhars[0];

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == 'Yes') throw new BadRequestException('Nadhar sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id: nadhar.id },
            data: {
                status: 'No'
            }
        })
        return result;
    }

    getAllRequests() {
        return this.prisma.nadhar.findMany({
            where: { status: 'Pending' }
        });
    }
}
