import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Public } from 'src/auth/auth.metadata';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Public()
  @Post()
  create(@Param('id') user: string, @Body() data: CreateSkillDto) {
    try {
      return this.skillsService.create(user, data);

    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get()
  findAll() {
    try {
      return this.skillsService.findAll();

    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.skillsService.findOne(id);

    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    try {
      return this.skillsService.update(id, updateSkillDto);

    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.skillsService.remove(id);

    } catch (error) {
      throw error;
    }
  }
}
