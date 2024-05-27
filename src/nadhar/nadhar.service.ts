import { Injectable } from '@nestjs/common';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NadharService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateNadharDto, userId: string) {
        const target = await this.prisma.taaruf.findFirst({
            where: { userId },
        });

        console.log(target);
        return 'This action adds a new nadhar';
    }

    updateDate(id: string, data: UpdateNadharDto) {
        return `This action updates a #${id} nadhar`;
    }
    cancel(id: string, data: UpdateNadharDto) {
        return `This action updates a #${id} nadhar`;
    }
    approve(id: string, data: UpdateNadharDto) {
        return `This action updates a #${id} nadhar`;
    }
    reject(id: string, data: UpdateNadharDto) {
        return `This action updates a #${id} nadhar`;
    }
}
