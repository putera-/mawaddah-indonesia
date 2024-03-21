import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request, HttpCode, NotFoundException } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Roles(Role.Member)
  @Post()
  create(@Request() req: any, @Body(new ValidationPipe()) data: CreateSkillDto) {
    try {
      return this.skillsService.create(req.user.id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findAll(@Request() req : any) {
    try {
      return this.skillsService.findAll(req.user.id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    try {
      return this.skillsService.findOne(req.user.id, id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body(new ValidationPipe()) data: UpdateSkillDto) {
    try {
      return this.skillsService.update(req.user.id, id, data);

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
      return this.skillsService.remove(req.user.id, id);

    } catch (error) {
      throw error;
    }
  }
}
