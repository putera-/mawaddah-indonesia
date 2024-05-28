import { Injectable } from '@nestjs/common';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { Nadhar, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NadharService {
    constructor(private prisma: PrismaService) { }

    async getAll (userId: string) {
        return this.prisma.taaruf.findMany({
            where: { userId: userId },
            include: {approval: true}
        });
    }
    
    async create(data: CreateNadharDtog, userId: string, taarufid: string) {
        const target = await this.prisma.taaruf.findFirst({
            //supaya hanya mendapatkan punya user dan yang status approved
            where: { id: taarufid, userId: userId, approval: { status: 'Yes' } },
            include: {approval: true}
        });

        if (target) {
            if (target.approval.status == 'Yes') {
                //create nadhor logic...
                
            } 
        }

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
