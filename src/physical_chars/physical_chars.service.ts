import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePhysicalCharDto } from './dto/update-physical_char.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { PhysicalCharacter, Prisma, TaarufStatus, body_shape } from '@prisma/client';

const select = {
    id: true,
    body_shape: true,
    skin_color: true,
    hair_type: true,
    hair_color: true,
    eye_color: true,
    characteristic: true,
    characteristic_detail: true,
    medical_history: true,
    medical_history_detail: true,
}

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
