import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Public } from 'src/auth/auth.metadata';
import { Education } from './educations.interface';

@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Public()
  @Post(':id')
  create(@Param('id') user: string, @Body() data: CreateEducationDto) {
    return this.educationsService.create(user, data);
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
