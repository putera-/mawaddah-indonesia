import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Public } from 'src/auth/auth.metadata';
import { Role } from 'src/roles/role.enums';

@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Public()
  @Post()
  create(@Request() req, @Body() data: CreateEducationDto) {
    return this.educationsService.create(req.id, data);
  }

  //TODO ntar ganti2in pake yang bener
  @Public()
  @Get()
  findAll() {
    try {
      return this.educationsService.findAll();
      
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationsService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationsService.update(id, updateEducationDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationsService.remove(id);
  }
}
