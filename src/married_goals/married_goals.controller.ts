import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request } from '@nestjs/common';
import { MarriedGoalsService } from './married_goals.service';
import { CreateMarriedGoalDto } from './dto/create-married_goal.dto';
import { UpdateMarriedGoalDto } from './dto/update-married_goal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('married-goals')
export class MarriedGoalsController {
  constructor(private readonly marriedGoalsService: MarriedGoalsService) { }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Post()
  async create(@Request() req: any, @Body(new ValidationPipe()) data: CreateMarriedGoalDto) {
    try {
      console.log(req.user.id)
      // return this.marriedGoalsService.create(req.user.id, data);

    } catch (error) {
      throw error;

    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Get()
  findAll() {
    try {
      return this.marriedGoalsService.findAll();

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.marriedGoalsService.findOne(id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Patch()
  update(@Request() req: any, @Body(new ValidationPipe()) data: UpdateMarriedGoalDto) {
    try {
      // console.log(req.user.id)
      return this.marriedGoalsService.update(req.user.id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.marriedGoalsService.remove(id);

    } catch (error) {
      throw error;
    }
  }
}
