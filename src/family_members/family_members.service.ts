import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyMemberDto } from './dto/create-family_member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family_member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FamilyMembersService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateFamilyMemberDto, userId: string) {
    const bioadata = await this.prisma.biodata.findUnique({
      where: {
        userId: userId,
      }
    })

    const result = await this.prisma.familyMember.create({
      data: {
        ...data,
        Biodata: {
          connect: { id: bioadata.id }
        }
      }
    })

    return result;
  }

  async findAll(userId: string) {
    const data = await this.prisma.familyMember.findMany({
      where: {
        Biodata: {
          userId: userId
        },
        deleted: false
      }
    })

    return data;

  }

  async findOne(id: string, userId: string) {
    const data = await this.prisma.familyMember.findFirst({
      where: {
        id: id,
        Biodata: {
          userId: userId
        },
        deleted: false
      }
    })

    if (!data) throw new NotFoundException();

    return data;
  }



  async update(id: string, data: UpdateFamilyMemberDto, userId: string) {
    const famMember = await this.findOne(id, userId)

    await this.prisma.familyMember.update({
      where: {
        id: famMember.id,
        Biodata: { userId }
      },
      data
    })

  }

  async remove(id: string, userId: string) {
    const famMember = await this.findOneDel(id, userId)

    if (famMember.deleted) {
      throw new NotFoundException();
    }

    await this.prisma.familyMember.update({
      where: {
        id: famMember.id,
        Biodata: { userId }
      },
      data: {
        deleted: true
      }
    })

  }

  async findOneDel(id: string, userId: string) {
    const data = await this.prisma.familyMember.findFirst({
      where: {
        id: id,
        Biodata: {
          userId: userId
        }
      }
    })

    if (!data) throw new NotFoundException();

    return data;
  }
}
