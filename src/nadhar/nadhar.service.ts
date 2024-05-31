import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

        if (target) {
            if (target.approval.status == 'Yes') {
                //create nadhor logic...
                //bikin table nadhar dengan status Pending
                await this.prisma.nadhar.create({
                    data: {
                        ...data,
                        Taaruf: { connect: { id: taarufid } },
                        schedule: data.schedule || 'aku mau kenal lebih dekat sama kamu',
                        message: data.message,
                        reply: data.reply || '',
                        status: 'Pending'
                    },
                });
            }
        }
        return data;
    }

    async updateDate(nadharId: string, data: UpdateNadharDto) {
        const nadhor = await this.prisma.nadhar.findFirst({ where: { id: nadharId } });
        if (nadhor.status == "No" || "Pending") throw new ForbiddenException('Request is has Been rejected or either cancelled');
        if (!nadhor) throw new NotFoundException();

        const result = await this.prisma.nadhar.update({
            where: { id: nadharId },
            data: {
                schedule: data.schedule
            }
        })
        return result;

    }
    async cancel(nadharReqId: string, data: UpdateNadharDto) {
        const nadhor = await this.prisma.nadhar.findFirst({ where: { id: nadharReqId } });
        if (nadhor.status != "Pending") throw new ForbiddenException('Request is has been cancelled or either approved');
        if (!nadhor) throw new NotFoundException();
        
        const result = await this.prisma.nadhar.update({
            where: { id: nadharReqId },
            data: {
                status: 'No',
                message: data.message || 'Maaf ga jadi'
            }
        })
        return result;
    }

    async approve(nadharReqId: string, data: UpdateNadharDto) {
        const nadhor = await this.prisma.nadhar.findFirst({ where: { id: nadharReqId } });
        if (nadhor.status == "Yes") throw new ForbiddenException('You can Only approve once');
        if (nadhor.status == "No") throw new ForbiddenException('Request is has Been rejected or either cancelled');
        if (!nadhor) throw new NotFoundException();

        const result = await this.prisma.nadhar.update({
            where: { id: nadhor.id },
            data: {
                status: 'Yes',
                schedule: data.schedule
            }
        })

        return result;
    }
    async reject(nadharReqId: string, data: UpdateNadharDto) {
        const nadhor = await this.prisma.nadhar.findFirst({ where: { id: nadharReqId } });
        if (nadhor.status != "Pending") throw new ForbiddenException('Request is has been cancelled or either approved');
        if (!nadhor) throw new NotFoundException();
        
        const result = await this.prisma.nadhar.update({
            where: { id: nadharReqId },
            data: {
                status: 'No',
                message: data.message || 'Maaf aku ga bisa'
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
