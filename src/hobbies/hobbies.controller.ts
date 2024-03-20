import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) { }

  @Roles(Role.Member)
  @Post()
  create(@Request() req : any, @Body(new ValidationPipe()) data: CreateHobbyDto) {
    try {
      return this.hobbiesService.create(req.user.id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findAll() {
    try {
      return this.hobbiesService.findAll();

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findOne(@Request() req : any) {
    try {
      return this.hobbiesService.findOne(req.user.id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Patch()
  update(@Request() req : any, @Body(new ValidationPipe()) data: UpdateHobbyDto) {
  try {
      return this.hobbiesService.update(req.user.id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Delete()
  remove(@Request() req : any) {
    try {
      return this.hobbiesService.remove(req.user.id);

    } catch (error) {
      throw error;
    }
  }
}
