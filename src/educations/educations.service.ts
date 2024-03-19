import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, RoleStatus } from '@prisma/client';
import { Education } from './educations.interface';
import { UsersService } from 'src/users/user.service';

const select = {
  institution_name: true,
  major: true,
  degree: true,
  city: true,
  startYear: true,
  endYear: true,
}
@Injectable()
export class EducationsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }
  async create(id: string, data: Prisma.EducationCreateInput) {
    if (!id) throw new Error('ID must be a valid ID');
    
    const user = await this.prisma.user.findUnique({ where: { id } });
    
    if (!user.id) throw new Error('User doesnt exist');
    // const user = await this.userService.findOne(id);
    
    return this.prisma.education.create({
      data: {
        ...data,
        User: { connect: { id } }
      },
      select
    });
  }


  findAll() {
    return this.prisma.education.findMany({
      where: { deleted: false }
    })
  }

  findOne(id: string) {
    return this.prisma.education.findFirst({
      where: { id, deleted: false }
    })
  }

  update(id: string, updateEducationDto: UpdateEducationDto) {
    return this.prisma.education.update({
      where: { id },
      data: { ...updateEducationDto },
      select
    })
  }

  remove(id: string) {
    return this.prisma.education.update({
      where: { id },
      data: { deleted: true },
    })
  }
}
