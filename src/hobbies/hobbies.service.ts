import { Injectable } from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class HobbiesService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }

  async create(id: string, data: Prisma.HobbyCreateInput) {
    if (!id) throw new Error('ID must be a valid ID');

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user.id) throw new Error('User doesnt exist');
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

  findOne(id: string) {
    return this.prisma.hobby.findFirst({
      where: { id, deleted: false }
    });
  }

  update(id: string, data: UpdateHobbyDto) {
    return this.prisma.hobby.update({
      where: { id },
      data: { ...data },
      select: {
        id: true,
        userId: true,
        title: true
      }
    });
  }

  remove(id: string) {
    return this.prisma.hobby.update({
      where: { id },
      data: { deleted: true }
    });
  }
}
