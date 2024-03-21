import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) { }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Post()
  create(@Param('id') user: string, @Body(new ValidationPipe()) data: CreateHobbyDto) {
    try {
      return this.hobbiesService.create(user, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Get()
  findAll() {
    try {
      return this.hobbiesService.findAll();

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.hobbiesService.findOne(id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateHobbyDto) {
    try {
      return this.hobbiesService.update(id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member, Role.Superadmin, Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.hobbiesService.remove(id);

    } catch (error) {
      throw error;
    }
  }
}
