import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMarriedGoalDto } from './dto/update-married_goal.dto';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';

const select = {
  id: true,
  userId: true,
  title: true,
  createdAt: true,
  updatedAt: true
}

@Injectable()
export class MarriedGoalsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }

  async create(id: string, data: Prisma.Married_goalCreateInput) {
    return this.prisma.married_goal.create({
      data: { ...data, User: { connect: { id } } },
      select
    });
  }

  async findAll(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [total, data] = await Promise.all([
      this.prisma.married_goal.count({
        where: { userId, deleted: false },
      }),
      this.prisma.married_goal.findMany({
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

    const data = await this.prisma.married_goal.findFirst({ where: { id, userId, deleted: false }, select });
    if (!data) {
      // Check if the education record exists for any user
      const goalExist = await this.prisma.married_goal.findUnique({ where: { id, deleted: false } });

      // If the education record exists but does not belong to the requesting user
      if (goalExist) {
        throw new ForbiddenException(`You dont have permission to access / on this server`);
      } else {
        throw new NotFoundException(`Data Not Found`);
      }
    };
    return data;
  }

  async update(userId: string, id: string, data: UpdateMarriedGoalDto) {
    const goalId = await this.findOne(userId, id);

    return this.prisma.married_goal.update({
      where: { id: goalId.id },
      data: { ...data, User: { connect: { id: userId } } },
      select
    });
  }

  async remove(userId: string, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Married_goal: true } });

    if (!user.Married_goal.length === null) throw new NotFoundException(`No data found`);

    const goalId = await this.findOne(userId, id);

    return this.prisma.married_goal.update({
      where: { id: goalId.id },
      data: { deleted: false }
    });
  }
}
