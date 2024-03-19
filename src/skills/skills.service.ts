import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }
  async create(id: string, data: Prisma.SkillCreateInput) {
    if (!id) throw new Error('ID must be a valid ID');

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user.id) throw new Error('User doesnt exist');
    // const user = await this.userService.findOne(id);

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

  findAll() {
    return this.prisma.skill.findMany({
      where: { deleted: false }
    });
  }

  findOne(id: string) {
    return this.prisma.skill.findFirst({
      where: { id, deleted: false }
    });
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.prisma.skill.update({
      where: { id },
      data: { ...updateSkillDto },
      select: {
        id: true,
        userId: true,
        title: true
      }
    });

  }

  remove(id: string) {
    return this.prisma.skill.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
