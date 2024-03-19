import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }
  
  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  create(@Param('id') user: string, @Body(new ValidationPipe()) data: CreateSkillDto) {
    try {
      return this.skillsService.create(user, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Get()
  findAll() {
    try {
      return this.skillsService.findAll();

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.skillsService.findOne(id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateSkillDto: UpdateSkillDto) {
    try {
      return this.skillsService.update(id, updateSkillDto);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.skillsService.remove(id);

    } catch (error) {
      throw error;
    }
  }
}
