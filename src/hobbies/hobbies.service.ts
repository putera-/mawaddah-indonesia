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

    if (!user) throw new NotFoundException(`Id not found`);

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

  findAll(userId: string) {
    const data = this.prisma.hobby.findMany({
      where: { userId, deleted: false }
    });
    if (!data) throw new NotFoundException(`Data not found`);
    return data;
  }

  async findOne(userId: string, id: string) {

    const data = this.prisma.hobby.findFirst({
      where: { id, userId, deleted: false }
    });
    if (!data) throw new NotFoundException(`Data not found`);

    return data;
  }

  async update(userId: string, id: string, data: UpdateHobbyDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, Hobby: true } });

    if (!user) throw new NotFoundException(`user with id ${id} not found`);

    if (!user.Hobby.length === null) throw new NotFoundException(`No Hobby found for user with id ${id}`);

    const HobbyId = user.Hobby[0].id;

    return this.prisma.hobby.update({
      where: { id: HobbyId },
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

  async remove(userid: string, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, Hobby: true } });

    if (!user) throw new NotFoundException(`user with id ${id} not found`);

    if (!user.Hobby.length === null) throw new NotFoundException(`No Hobby found for user with id ${id}`);

    const HobbyId = user.Hobby[0].id;

    return this.prisma.hobby.update({
      where: { id: HobbyId },
      data: { deleted: true }
    });
  }
}
