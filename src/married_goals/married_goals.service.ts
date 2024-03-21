import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMarriedGoalDto } from './dto/update-married_goal.dto';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';

const select = {
  id: true,
  userId: true,
  title: true
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

  async findAll(userId: string) {

    const data = this.prisma.married_goal.findMany({ where: { userId, deleted: false } });
    if (!data) throw new NotFoundException(`No Data Found`);
    return data;
  }

  async findOne(userId: string, id: string) {

    const data = await this.prisma.married_goal.findFirst({ where: { id, userId, deleted: false } });
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
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Married_goal: true } });

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
