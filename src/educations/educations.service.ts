import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';

const select = {
  id: true,
  userId: true,
  institution_name: true,
  major: true,
  degree: true,
  city: true,
  startYear: true,
  endYear: true,
  createdAt: true,
  updatedAt: true
}

@Injectable()
export class EducationsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }
  async create(id: string, data: Prisma.EducationCreateInput) {

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    return this.prisma.education.create({
      data: { ...data, User: { connect: { id } } },
      select
    });
  }

  async findAll(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [total, data] = await Promise.all([
      this.prisma.education.count({
        where: { userId, deleted: false },
      }),
      this.prisma.education.findMany({
        where: { userId, deleted: false },
        orderBy: { createdAt: 'desc' },
        select,
        skip,
        take: Number(limit),
      }),
    ]);
    if (data.length == 0) throw new NotFoundException(`No Data Found`);
    return {
      data,
      total,
      page: +page,
      maxPages: Math.ceil(total / limit),
      limit: +limit
    }
  }


  async findOne(userId: string, id: string) {
    const data = await this.prisma.education.findFirst({ where: { id, userId, deleted: false }, select });
    if (!data) {
      // Check if the education record exists for any user
      const eduExists = await this.prisma.education.findUnique({ where: { id, deleted: false } });

      // If the education record exists but does not belong to the requesting user
      if (eduExists) {
        throw new ForbiddenException(`You dont have permission to access / on this server`);
      } else {
        throw new NotFoundException(`Data Not Found`);
      }
    };
    return data;
  }

  async update(userId: string, id: string, data: UpdateEducationDto) {
    const educationId = await this.findOne(userId, id);

    return this.prisma.education.update({
      where: { id: educationId.id },
      data: { ...data, User: { connect: { id: userId } } },
      select
    });
  }

  async remove(userId: string, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Education: true } });
    if (!user.Education.length === null) throw new NotFoundException(`No data found`);
    const educationId = await this.findOne(userId, id);

    return this.prisma.education.update({
      where: { id: educationId.id },
      data: { deleted: true },
    });
  }
}
