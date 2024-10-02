import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyMemberDto } from './dto/create-family_member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family_member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FamilyMembersService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateFamilyMemberDto, userId: string) {
        const biodata = await this.prisma.biodata.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!biodata)
            throw new NotFoundException(
                'Silakan lengkapi biodata terlebih dahulu.',
            );

        const result = await this.prisma.familyMember.create({
            data: {
                ...data,
                biodata: {
                    connect: { id: biodata.id },
                },
            },
        });

        return result;
    }

    async findAll(userId: string) {
        const data = await this.prisma.familyMember.findMany({
            where: {
                biodata: {
                    userId: userId,
                },
                deleted: false,
            },
        });
        if (!data) throw new NotFoundException('Data tidak ditemukan');
        return data;
    }

    async findOne(id: string, userId: string) {
        const data = await this.prisma.familyMember.findFirst({
            where: {
                id: id,
                biodata: {
                    userId: userId,
                },
                deleted: false,
            },
        });

        if (!data) throw new NotFoundException('Data tidak ditemukan');

        return data;
    }

    async update(id: string, data: UpdateFamilyMemberDto, userId: string) {
        const famMember = await this.findOne(id, userId);

        if (!famMember) {
            throw new NotFoundException('Data tidak ditemukan');
        }
        
        return await this.prisma.familyMember.update({
            where: {
                id: famMember.id,
                biodata: { userId },
            },
            data,
        });
    }

    async remove(id: string, userId: string) {
        const famMember = await this.findOneDel(id, userId);

        if (famMember.deleted) {
            throw new NotFoundException('Data tidak ditemukan');
        }

        await this.prisma.familyMember.update({
            where: {
                id: famMember.id,
                biodata: { userId },
            },
            data: {
                deleted: true,
            },
        });

        return;
    }

    async findOneDel(id: string, userId: string) {
        const data = await this.prisma.familyMember.findFirst({
            where: {
                id: id,
                biodata: {
                    userId: userId,
                },
            },
        });

        if (!data) throw new NotFoundException();

        return data;
    }
}
