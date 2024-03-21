import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

const select = {
  id: true,
  userId: true,
  title: true,
  createdAt: true,
  updatedAt: true
}

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }

  async create(id: string, data: Prisma.SkillCreateInput) {
    return this.prisma.skill.create({
      data: { ...data, User: { connect: { id } } },
      select
    });
  }

  async findAll(userId: string) {
    const data = await this.prisma.skill.findMany({ where: { userId, deleted: false }, select });
    if (data.length == 0) throw new NotFoundException(`No Data Found`);
    return data;
  }

  async findOne(userId: string, id: string) {
    const data = await this.prisma.skill.findFirst({ where: { id, userId, deleted: false }, select });
    if (!data) {
      // Check if the education record exists for any user
      const skillExist = await this.prisma.skill.findUnique({ where: { id, deleted: false } });

      // If the education record exists but does not belong to the requesting user
      if (skillExist) {
        throw new ForbiddenException(`You dont have permission to access / on this server`);
      } else {
        throw new NotFoundException(`Data Not Found`);
      }
    };
    return data;
  }

  async update(userId: string, id: string, data: UpdateSkillDto) {
    const skillId = await this.findOne(userId, id);

    return this.prisma.skill.update({
      where: { id: skillId.id },
      data: { ...data, User: { connect: { id: userId } } },
      select
    });
  }

  async remove(userId: string, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Skill: true } });
    if (!user.Skill.length === null) throw new NotFoundException(`No data found`);
    const skillId = await this.findOne(userId, id);

    return this.prisma.skill.update({
      where: { id: skillId.id },
      data: { deleted: true }
    });
  }
}
