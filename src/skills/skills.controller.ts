import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request, HttpCode } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }
  
  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  create(@Request() req : any, @Body(new ValidationPipe()) data: CreateSkillDto) {
    try {
      return this.skillsService.create(req.user.id, data);

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
  @Get()
  findOne(@Request() req : any) {
    try {
      return this.skillsService.findOne(req.user.id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Patch()
  update(@Request() req : any, @Body(new ValidationPipe()) data: UpdateSkillDto) {
    try {
      return this.skillsService.update(req.user.id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @HttpCode(204)
  @Delete()
  remove(@Request() req : any) {
    try {
      return this.skillsService.remove(req.user.id);

    } catch (error) {
      throw error;
    }
  }
}
