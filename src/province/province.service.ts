import { Injectable } from '@nestjs/common';
// import { CreateProvinceDto } from './dto/create-province.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProvinceService {
    constructor(private Prisma: PrismaService) {}
    create(data: Prisma.ProvinceCreateInput) {
        return this.Prisma.province.create({
            data,
        });
    }

    findAll() {
        return this.Prisma.province.findMany({ orderBy: { name: 'asc' } });
    }

    findOne(id: string) {
        return this.Prisma.province.findFirst({
            where: { id },
        });
    }

    update(id: string, data: Prisma.ProvinceCreateInput) {
        return this.Prisma.province.update({ where: { id }, data });
    }

    async remove(id: string): Promise<void> {
        await this.Prisma.province.update({
            where: { id },
            data: { deleted: true },
        });
    }
}
