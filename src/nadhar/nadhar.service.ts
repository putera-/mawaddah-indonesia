import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { PrismaService } from 'src/prisma.service';
import { Nadhar } from './nadhar.interface';

@Injectable()
export class NadharService {
    constructor(private prisma: PrismaService) { }

    async getAll(userId: string) {
        return await this.prisma.taaruf.findMany({
            where: { userId },
            include: {
                approval: true,
                khitbahs: true,
                nadhars: true
            }
        });
    }

    async create(data: CreateNadharDto, userId: string, taarufid: string): Promise<Nadhar> {
        const taaruf = await this.prisma.taaruf.findFirst({
            //supaya hanya mendapatkan punya user dan yang status approved
            where: { id: taarufid, userId: userId, approval: { status: 'Yes' } },
            include: {
                approval: true,
                nadhars: true,
            }
        });

        // cek apakah data taaruf ada apa tidak
        if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

        // check apakah nadhar sudah disetujui atau belum
        const has_approved_nadhar = taaruf.nadhars.some(nadhar => nadhar.status == 'Yes');
        if (has_approved_nadhar) throw new BadRequestException('Nadhar anda sudah disetujui.');

        //create nadhor dengan status pending
        const result = await this.prisma.nadhar.create({
            data: {
                ...data,
                Taaruf: { connect: { id: taaruf.id } },
                schedule: data.schedule,
                message: data.message || '',
                reply: data.reply || '',
                status: 'Pending'
            },
        });
        return result;
    }

    async update(id: string, data: UpdateNadharDto): Promise<Nadhar> {
        const nadhar = await this.findOne(id);

        if (!nadhar) throw new NotFoundException();

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == 'Yes') throw new BadRequestException('Nadhar sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id },
            data
        })
        return result;

    }

    async cancel(id: string): Promise<Nadhar> {
        const nadhar = await this.prisma.nadhar.findFirst({
            where: { id: id },
        });

        if (!nadhar) throw new NotFoundException();

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == 'Yes') throw new BadRequestException('Nadhar sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id },
            data: {
                status: 'No'
            }
        })
        return result;
    }

    async approve(id: string): Promise<Nadhar> {
        const nadhar = await this.findOne(id);

        if (!nadhar) throw new NotFoundException();

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == 'Yes') throw new BadRequestException('Nadhar sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id },
            data: {
                status: 'Yes'
            }
        })
        return result;
    }
    async reject(id: string): Promise<Nadhar> {
        const nadhar = await this.findOne(id);

        if (!nadhar) throw new NotFoundException();

        //check if nadhar was approved, if (approved) => not allowed to update/change data
        if (nadhar.status == 'Yes') throw new BadRequestException('Nadhar sudah disetujui, tidak bisa mengubah data');

        const result = await this.prisma.nadhar.update({
            where: { id },
            data: {
                status: 'No'
            }
        })
        return result;
    }

    findOne(id: string): Promise<Nadhar> {
        return this.prisma.nadhar.findFirst({
            where: { id: id },
        });
    }
}
