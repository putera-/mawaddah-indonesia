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
        return this.Prisma.province.findMany();
    }

    findOne(id: string) {
        return this.Prisma.province.findFirst({
            where: { id },
        });
    }

    update(id: string, data: Prisma.ProvinceCreateInput) {
        return this.Prisma.province.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.Prisma.province.update({
            where: { id },
            data: { deleted: true },
        });
    }
}
