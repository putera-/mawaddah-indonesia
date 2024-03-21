import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLifeGoalDto } from './dto/create-life_goal.dto';
import { UpdateLifeGoalDto } from './dto/update-life_goal.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma } from '@prisma/client';

const select = {
  id: true,
  userId: true,
  title: true,
  createdAt: true,
  updatedAt: true

}
@Injectable()
export class LifeGoalsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }

  async create(id: string, data: Prisma.Life_goalCreateInput) {
    return this.prisma.life_goal.create({
      data: { ...data, User: { connect: { id } } },
      select
    });
  }

  async findAll(userId: string) {
    const data = await this.prisma.life_goal.findMany({ where: { userId, deleted: false }, select });
    if (data.length == 0) throw new NotFoundException(`No Data Found`);
    return data;
  }

  async findOne(userId: string, id: string) {
    const data = await this.prisma.life_goal.findFirst({ where: { id, userId, deleted: false }, select });
    if (!data) {
      // Check if the education record exists for any user
      const life_goalExist = await this.prisma.life_goal.findUnique({ where: { id, deleted: false } });
      // If the education record exists but does not belong to the requesting user
      if (life_goalExist) {
        throw new ForbiddenException(`You dont have permission to access / on this server`);
      } else {
        throw new NotFoundException(`Data Not Found`);
      }
    };
    return data;
  }

  async update(userId: string ,id: string, data: UpdateLifeGoalDto) {
    const goalId = await this.findOne(userId, id);

    return this.prisma.life_goal.update({
      where: { id: goalId.id },
      data: { ...data, User: { connect: { id: userId } } },
      select
    });
  }

  async remove(userId: string, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Life_goal: true } });
    if (!user.Life_goal.length === null) throw new NotFoundException(`No data found`);
    const Life_goalId = await this.findOne(userId, id);

    return this.prisma.life_goal.update({
      where: { id: Life_goalId.id },
      data: { deleted: true }
    });
  }
}
