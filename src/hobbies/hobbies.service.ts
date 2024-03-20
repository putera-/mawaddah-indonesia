import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class HobbiesService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }

  async create(id: string, data: Prisma.HobbyCreateInput) {

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    return this.prisma.hobby.create({
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
    return this.prisma.hobby.findMany({
      where: { deleted: false }
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Hobby: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const HobbyId = user.Hobby[0].id;

    return this.prisma.hobby.findFirst({
      where: { id: HobbyId, deleted: false }
    });
  }

  async update(id: string, data: UpdateHobbyDto) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Hobby: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const HobbyId = user.Hobby[0].id;

    return this.prisma.hobby.update({
      where: { id: HobbyId },
      data: { ...data, User: { connect: { id } } },
      select: {
        id: true,
        userId: true,
        title: true
      }
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Hobby: true } });

    if (!user.id) throw new NotFoundException(`Id not found`);

    const HobbyId = user.Hobby[0].id;

    return this.prisma.hobby.update({
      where: { id: HobbyId },
      data: { deleted: true }
    });
  }
}
