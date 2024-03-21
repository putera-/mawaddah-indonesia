import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }

  async create(id: string, data: Prisma.SkillCreateInput) {

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    return this.prisma.skill.create({
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

  findAll(userId: string) {
    const data = this.prisma.skill.findMany({
      where: {userId, deleted: false }
    });
    if (!data) throw new NotFoundException(`Data not found`);
    return data;

  }

  async findOne(userId: string, id: string) {

    const data =  this.prisma.skill.findFirst({
      where: { id, userId , deleted: false }
    });
    if (!data) throw new NotFoundException(`Data not found`);


    return data
  }

  async update(userId: string, id : string, data: UpdateSkillDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Skill: true } });

    if (!user) throw new NotFoundException(`user with id ${id} not found`);

    if (!user.Skill.length === null ) throw new NotFoundException(`No skills found for user with id ${id}`);

    const skillId = user.Skill[0].id;
    return this.prisma.skill.update({
      where: { id: skillId },
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

  async remove(userId : string, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Skill: true } });

    if (!user) throw new NotFoundException(`user with id ${id} not found`);

    if (!user.Skill.length === null) throw new NotFoundException(`No Married Goals found for user with id ${id}`);

    const skillId = user.Skill[0].id;

    return this.prisma.skill.update({
      where: { id: skillId },
      data: { deleted: true },
    });
  }
}
