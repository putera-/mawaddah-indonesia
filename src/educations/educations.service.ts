import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, RoleStatus } from '@prisma/client';
import { UsersService } from 'src/users/user.service';

const select = {
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

    if (!user.id) throw new NotFoundException(`Id not found`);

    return this.prisma.education.create({
      data: {
        ...data,
        User: { connect: { id } }
      },
      select
    });
  }


  findAll() {
    return this.prisma.education.findMany({
      where: { deleted: false }
    })
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Education: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const educationId = user.Education[0].id;

    return this.prisma.education.findFirst({
      where: { id: educationId, deleted: false }
    })
  }

  async update(id: string, data: UpdateEducationDto) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Education: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const educationId = user.Education[0].id;

    return this.prisma.education.update({
      where: { id: educationId },
      data: {
        ...data,
        User: { connect: { id } }
      },
      select
    })
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Education: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const educationId = user.Education[0].id;

    return this.prisma.education.update({
      where: { id: educationId },
      data: { deleted: true },
    })
  }
}
