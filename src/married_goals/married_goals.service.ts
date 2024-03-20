import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMarriedGoalDto } from './dto/update-married_goal.dto';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MarriedGoalsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }

  async create(id: string, data: Prisma.Married_goalCreateInput) {

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException(`Id not found`);
    
    return this.prisma.married_goal.create({
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
  
  async findAll(userId: string) {
     
    return this.prisma.married_goal.findMany({
      where: { userId , deleted: false }
    });
  }
  
  async findOne(userId : string ,id: string) {
    
    const data = await this.prisma.married_goal.findFirst({
      where: { id, userId, deleted: false }
    });
    if (!data) throw new NotFoundException(`Data not found`);

    return data;
  }

  async update(userId : string ,id: string, data: UpdateMarriedGoalDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Married_goal: true } });

    if (!user) throw new NotFoundException(`user with id ${id} not found`);

    if (!user.Married_goal.length === null ) throw new NotFoundException(`No Married Goals found for user with id ${id}`);

    const goalId = user.Married_goal[0].id;

    return this.prisma.married_goal.update({
      where: { id: goalId },
      data: {
        ...data,
        User: { connect: { id: userId } }
      },
      select: {
        id: true,
        userId: true,
        title: true
      }
    });
    
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Married_goal: true } });

    const goalId = user.Married_goal[0].id;


    return this.prisma.married_goal.update({
      where: { id: goalId },
      data: { deleted: false }
    });
  }
}
