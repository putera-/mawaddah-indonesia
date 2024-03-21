import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, ValidationPipe, NotFoundException, Query } from '@nestjs/common';
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
    const userId = req.user.id
    try {
      return this.lifeGoalsService.create(userId, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findAll(@Request() req: any, @Query('page') page: number, @Query('limit') limit: number) {
    const userId = req.user.id
    try {
      return this.lifeGoalsService.findAll(userId, page, limit);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id
    try {
      return this.lifeGoalsService.findOne(userId, id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body(new ValidationPipe()) data: UpdateLifeGoalDto) {
    const userId = req.user.id
    try {
      return this.lifeGoalsService.update(userId, id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Delete(':id')
  @HttpCode(204)
  remove(@Request() req: any, @Param('id') id: string) {
    try {
      const userId = req.user.id
      if (!id) throw new NotFoundException('Id not found');
      return this.lifeGoalsService.remove(userId, id);

    } catch (error) {
      throw error;
    }
  }
}
