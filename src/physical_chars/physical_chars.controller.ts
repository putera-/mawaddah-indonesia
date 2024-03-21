import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request, NotFoundException, HttpCode, Query } from '@nestjs/common';
import { PhysicalCharsService } from './physical_chars.service';
import { CreatePhysicalCharDto } from './dto/create-physical_char.dto';
import { UpdatePhysicalCharDto } from './dto/update-physical_char.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('physical_chars')
export class PhysicalCharsController {
  constructor(private readonly physicalCharsService: PhysicalCharsService) { }

  @Roles(Role.Member)
  @Post()
  create(@Request() req: any, @Body(new ValidationPipe()) data: CreatePhysicalCharDto) {
    try {
      return this.physicalCharsService.create(req.user.id, data);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get()
  findAll(@Request() req: any, @Query('page') page: number, @Query('limit') limit: number) {
    const userId = req.user.id
    try {
      return this.physicalCharsService.findAll(userId, page, limit);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    try {
      return this.physicalCharsService.findOne(req.user.id, id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body(new ValidationPipe()) data: UpdatePhysicalCharDto) {
    try {
      return this.physicalCharsService.update(req.user.id, id, data);

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
      return this.physicalCharsService.remove(req.user.id, id);

    } catch (error) {
      throw error;
    }
  }
}
