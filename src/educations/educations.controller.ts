import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, ValidationPipe } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Public } from 'src/auth/auth.metadata';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) { }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  create(@Param('id') user: string, @Body(new ValidationPipe()) data: CreateEducationDto) {
    return this.educationsService.create(user, data);
  }

  //TODO ntar ganti2in pake yang bener
  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Get()
  findAll() {
    try {
      return this.educationsService.findAll();

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.educationsService.findOne(id);

    } catch (error) {
      throw error;

    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateEducationDto: UpdateEducationDto) {
    try {
      return this.educationsService.update(id, updateEducationDto);

    } catch (error) {
      throw error;

    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.educationsService.remove(id);

    } catch (error) {
      throw error;

    }
  }
}
