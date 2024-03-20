import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';

const select = {
  id: true,
  institution_name: true,
  major: true,
  degree: true,
  city: true,
  startYear: true,
  endYear: true,
}
@Injectable()
export class EducationsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }
  async create(id: string, data: Prisma.EducationCreateInput) {

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException(`Id not found`);

    return this.prisma.education.create({
      data: {
        ...data,
        User: { connect: { id } }
      },
      select
    });
  }


  findAll(userId: string) {
    const data = this.prisma.education.findMany({
      where: { userId, deleted: false }
    });
    if (!data) throw new NotFoundException(`Data not found`);
    return data;
  }

  async findOne(userId: string, id: string) {

    const data = this.prisma.education.findFirst({
      where: { id, userId, deleted: false }
    });
    if (!data) throw new NotFoundException(`Data not found`);

    return data;
  }

  async update(userId: string, id: string, data: UpdateEducationDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Education: true } });

    if (!user) throw new NotFoundException(`user with id ${id} not found`);

    if (!user.Education.length === null) throw new NotFoundException(`No Education found for user with id ${id}`);

    // const educationId = user.Education[0].id;
    //TODO BESOK LAKUIN KAYAK BEGINI KESEMUA USER RELATION YANG UDAH DIBUAT
    const educationId = await this.findOne( userId, id);

    return this.prisma.education.update({
      where: { id: educationId.id },
      data: {
        ...data,
        User: { connect: { id: userId } }
      },
      select
    })
  }

  async remove(userId: string, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Education: true } });

    if (!user) throw new NotFoundException(`user with id ${id} not found`);

    if (!user.Education.length === null) throw new NotFoundException(`No Education found for user with id ${id}`);

    const educationId = user.Education[0].id;

    return this.prisma.education.update({
      where: { id: educationId },
      data: { deleted: true },
    })
  }
}
