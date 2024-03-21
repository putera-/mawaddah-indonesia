import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request, HttpCode } from '@nestjs/common';
import { MarriedGoalsService } from './married_goals.service';
import { CreateMarriedGoalDto } from './dto/create-married_goal.dto';
import { UpdateMarriedGoalDto } from './dto/update-married_goal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('married-goals')
export class MarriedGoalsController {
  constructor(private readonly marriedGoalsService: MarriedGoalsService) { }

  @Roles(Role.Member)
  @Post()
  async create(@Request() req: any, @Body(new ValidationPipe()) data: CreateMarriedGoalDto) {
    try {
      return this.marriedGoalsService.create(req.user.id, data);

    } catch (error) {
      throw error;

    }
  }

  @Roles(Role.Member)
  @Get()
  findAll(@Request() req : any) {
    try {
      return this.marriedGoalsService.findAll(req.user.id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get(':id')
  findOne(@Request() req : any, @Param('id') id: string) {
    try {
      return this.marriedGoalsService.findOne(req.user.id, id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body(new ValidationPipe()) data: UpdateMarriedGoalDto) {
    try {
      // console.log(req.user.id)
      return this.marriedGoalsService.update(req.user.id, id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @HttpCode(204)
  @Delete(':id')
  //TODO NTAR UPDATE INI, SAMA DI SKILLS JUGA
  remove(@Request() req: any, @Param('id') id: string) {
    try {
      return this.marriedGoalsService.remove(req.user.id, id);

    } catch (error) {
      throw error;
    }
  }
}
