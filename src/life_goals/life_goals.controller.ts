import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, ValidationPipe, NotFoundException } from '@nestjs/common';
import { LifeGoalsService } from './life_goals.service';
import { CreateLifeGoalDto } from './dto/create-life_goal.dto';
import { UpdateLifeGoalDto } from './dto/update-life_goal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('life-goals')
export class LifeGoalsController {
  constructor(private readonly lifeGoalsService: LifeGoalsService) { }

  @Roles(Role.Member)
  @Post()
  create(@Request() req: any, @Body(new ValidationPipe()) data: CreateLifeGoalDto) {
    try {
      return this.lifeGoalsService.create(req.user.id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findAll(@Request() req: any) {
    try {
      return this.lifeGoalsService.findAll(req.user.id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    try {
      return this.lifeGoalsService.findOne(req.user.id, id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body(new ValidationPipe()) data: UpdateLifeGoalDto) {
    try {
      return this.lifeGoalsService.update(req.user.id, id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Delete(':id')
  @HttpCode(204)
  remove(@Request() req: any, @Param('id') id: string) {
    try {
      if (!id) throw new NotFoundException('Id not found');
      return this.lifeGoalsService.remove(req.user.id, id);

    } catch (error) {
      throw error;
    }
  }
}
