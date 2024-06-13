import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma, NonPhysicalCharacter } from '@prisma/client';

@Injectable()
export class NonPhysicalCharsService {
  constructor(private prisma: PrismaService) { }

  async upsert(biodataId: string, data: Prisma.NonPhysicalCharacterCreateInput) {

    return this.prisma.nonPhysicalCharacter.upsert({
      where: { biodataId },
      update: data,
      create: data

    });
  }

  async findOne(userId: string, biodataId: string): Promise<NonPhysicalCharacter> {
    //TODO insert data dummy jika belum punya physical_character

    const data = await this.prisma.biodata.findFirst({
      where: {
        userId
      },
      select: {
        id: true,
        non_physical_chars: true
      }
    })

    if (!data.non_physical_chars) {
      return this.prisma.nonPhysicalCharacter.create({
        data: {
          biodata: { connect: { id: biodataId } }
        }
      })

    }

    return data.non_physical_chars;

  }

}