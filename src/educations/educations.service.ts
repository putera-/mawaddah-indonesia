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
  start_year: true,
  end_year: true,
}
@Injectable()
export class EducationsService {
  constructor(private prisma: PrismaService, private userService: UsersService) { }
  async create(id: string, data: Prisma.EducationCreateInput) {
    return this.prisma.education.create({
      data: {
        ...data,
        User: { connect: { id } }
      },
      select: {
        // Add the properties you want to select here
        institution_name: true,
        major: true,
        degree: true,
        startYear: true,
        endYear: true
      }
    });
  }


  findAll() {
    return this.prisma.education.findMany({
      where: { deleted: false }
    })
  }

  findOne(id: string) {
    return this.prisma.education.findFirst()
  }

  update(id: string, updateEducationDto: UpdateEducationDto) {
    return `This action updates a #${id} education`;
  }

  remove(id: string) {
    return `This action removes a #${id} education`;
  }
}
