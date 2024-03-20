import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, ValidationPipe } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) { }

  @Roles(Role.Member)
  @Post()
  create(@Request() req: any, @Body(new ValidationPipe()) data: CreateEducationDto) {
    return this.educationsService.create(req.user.id, data);
  }

  //TODO ntar ganti2in pake yang bener
  @Roles(Role.Member)
  @Get()
  findAll() {
    try {
      return this.educationsService.findAll();

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findOne(@Request() req: any) {
    try {
      return this.educationsService.findOne(req.user.id);

    } catch (error) {
      throw error;

    }
  }

  @Roles(Role.Member)
  @Patch()
  update(@Request() req: any, @Body(new ValidationPipe()) data: UpdateEducationDto) {
    try {
      return this.educationsService.update(req.user.id, data);

    } catch (error) {
      throw error;

    }
  }

  @Roles(Role.Member)
  @HttpCode(204)
  @Delete()
  remove(@Request() req: any) {
    try {
      return this.educationsService.remove(req.user.id);

    } catch (error) {
      throw error;

    }
  }
}
