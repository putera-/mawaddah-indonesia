import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLifeGoalDto } from './dto/create-life_goal.dto';
import { UpdateLifeGoalDto } from './dto/update-life_goal.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LifeGoalsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }

  async create(id: string, data: Prisma.Life_goalCreateInput) {

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    return this.prisma.life_goal.create({
      data: {
        ...data,
        User: { connect: { id } }
      },
      select: {
        id: true,
        userId: true,
        title: true
      }
    });
  }

  findAll() {
    return this.prisma.life_goal.findMany({
      where: { deleted: false }
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Life_goal: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const life_goalId = user.Life_goal[0].id;

    return this.prisma.skill.findFirst({
      where: { id: life_goalId, deleted: false }
    });
  }

  async update(id: string, data: UpdateLifeGoalDto) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Life_goal: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const life_goalId = user.Life_goal[0].id;

    return this.prisma.skill.update({
      where: { id: life_goalId },
      data: {
        ...data,
        User: { connect: { id } }
      },
      select: {
        id: true,
        userId: true,
        title: true
      }
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Life_goal: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const Life_goalId = user.Life_goal[0].id;

    return this.prisma.skill.update({
      where: { id: Life_goalId },
      data: { deleted: true },
    });
  }
}
