import { Injectable } from '@nestjs/common';
import { CreateMarriagePreparationDto } from './dto/create-marriage_preparation.dto';
import { UpdateMarriagePreparationDto } from './dto/update-marriage_preparation.dto';
import { PrismaService } from 'src/prisma.service';
import { MarriagePreparation, Prisma } from '@prisma/client';

@Injectable()
export class MarriagePreparationService {
    constructor(private prisma: PrismaService) { }

    async upsert(biodataId: string, data: Prisma.MarriagePreparationCreateInput) {

        return this.prisma.marriagePreparation.upsert({
            where: { biodataId },
            update: data,
            create: data

        });
    }

    async findOne(userId: string, biodataId: string): Promise<MarriagePreparation> {
        //TODO insert data dummy jika belum punya physical_character

        const data = await this.prisma.biodata.findFirst({
            where: {
                userId
            },
            select: {
                id: true,
                marriage_preparations: true
            }
        })

        if (!data.marriage_preparations) {
            return this.prisma.marriagePreparation.create({
                data: {
                    Biodata: { connect: { id: biodataId } }
                }
            })

        }

        return data.marriage_preparations;

    }

}
