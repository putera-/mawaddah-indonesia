import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, ValidationPipe } from '@nestjs/common';
import { LifeGoalsService } from './life_goals.service';
import { CreateLifeGoalDto } from './dto/create-life_goal.dto';
import { UpdateLifeGoalDto } from './dto/update-life_goal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('life-goals')
export class LifeGoalsController {
  constructor(private readonly lifeGoalsService: LifeGoalsService) {}

  @Roles(Role.Member)
  @Post()
  create(@Request() req : any, @Body(new ValidationPipe()) data: CreateLifeGoalDto) {
    try {
      return this.lifeGoalsService.create(req.user.id ,data);
      
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findAll()  {
    try {
      return this.lifeGoalsService.findAll();
      
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findOne(@Request() req : any ) {
    try {
      return this.lifeGoalsService.findOne(req.user.id);
      
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Patch()
  update(@Request() req : any , @Body(new ValidationPipe()) data: UpdateLifeGoalDto) {
    try {
      return this.lifeGoalsService.update(req.user.id, data);
      
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Delete()
  @HttpCode(204)
  remove(@Request() req : any ) {
    try {
      return this.lifeGoalsService.remove(req.user.id);
      
    } catch (error) {
      throw error;
    }
  }
}
