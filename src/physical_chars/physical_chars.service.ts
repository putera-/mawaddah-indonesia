import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { PhysicalCharacter, Prisma } from '@prisma/client';

@Injectable()
export class PhysicalCharsService {
    constructor(private prisma: PrismaService, private userService: UsersService) { }

    async upsert(biodataId: string, data: Prisma.PhysicalCharacterCreateInput) {

        return this.prisma.physicalCharacter.upsert({
            where: { biodataId },
            update: data,
            create: data

        });
    }

    async findOne(userId: string, biodataId: string): Promise<PhysicalCharacter> {
        //TODO insert data dummy jika belum punya physical_character

        const data = await this.prisma.biodata.findFirst({
            where: {
                userId
            },
            select: {
                id: true,
                physical_characters: true
            }
        })

        if (!data.physical_characters) {
            return this.prisma.physicalCharacter.create({
                data: {
                    Biodata: { connect: { id: biodataId } }
                }
            })

        }

        return data.physical_characters;

    }

}
