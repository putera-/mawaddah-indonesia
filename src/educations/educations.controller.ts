import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, ValidationPipe, NotFoundException } from '@nestjs/common';
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
    try {
      return this.educationsService.create(req.user.id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findAll(@Request() req: any) {
    try {
      return this.educationsService.findAll(req.user.id);

    } catch (error) {
      throw error;
    }
  }


  @Roles(Role.Member)
  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    try {
      return this.educationsService.findOne(req.user.id, id);

    } catch (error) {
      throw error;

    }
  }

  @Roles(Role.Member)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body(new ValidationPipe()) data: UpdateEducationDto) {
    try {
      return this.educationsService.update(req.user.id, id, data);

    } catch (error) {
      throw error;

    }
  }

  @Roles(Role.Member)
  @HttpCode(204)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    try {
      if (!id) throw new NotFoundException('Id not found');
      return this.educationsService.remove(req.user.id, id);

    } catch (error) {
      throw error;

    }
  }
}
