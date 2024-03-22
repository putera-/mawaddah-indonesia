import { Injectable } from '@nestjs/common';
// import { CreateBiodatumDto } from './dto/create-biodatum.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

const select = {
    bio: true,
    phone: true,
    manhaj: true,
    gender: true,
    marriage_status: true,
    marriage_permission: true,
    dob: true,
    birth_place: true,
    birth_order: true,
    domicile_town: true,
    domicile_province: true,
    hometown_province: true,
    ethnic: true,
};

@Injectable()
export class BiodataService {
    constructor(
        // private readonly userService: UsersService,
        private Prisma: PrismaService,
    ) {}
    create(id: string, data: Prisma.BiodataCreateInput) {
        return this.Prisma.biodata.create({
            data: {
                ...data,
                user: {
                    connect: { id },
                },
            },
        });
    }

    findAll(gender: string) {
        const oppositeGender = this.getOppositeGender(gender);
        return this.Prisma.biodata.findMany({
            select: { ...select },
            where: { gender: oppositeGender },
        });
    }
    getOppositeGender(gender: any) {
        let oppositeGender: any;
        if (gender === 'PRIA') oppositeGender = 'WANITA';
        else if (gender === 'WANITA') oppositeGender = 'PRIA';
        return oppositeGender;
    }

    findOne(id: string) {
        return this.Prisma.biodata.findFirst({
            where: {
                id,
            },
            select: { ...select },
        });
    }
    findMe(id: string) {
        return this.Prisma.biodata.findFirst({
            where: {
                userId: id,
            },
            select: { ...select },
        });
    }

    update(id: string, data: Prisma.BiodataCreateInput) {
        return this.Prisma.biodata.update({ where: { id }, data });
    }
}
