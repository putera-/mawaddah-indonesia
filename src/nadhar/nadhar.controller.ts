import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';

@Controller('nadhar')
export class NadharController {
  constructor(private readonly nadharService: NadharService) {}

  @Post()
  create(@Body() createNadharDto: CreateNadharDto) {
    return this.nadharService.create(createNadharDto);
  }

  @Get()
  findAll() {
    return this.nadharService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nadharService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNadharDto: UpdateNadharDto) {
    return this.nadharService.update(+id, updateNadharDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nadharService.remove(+id);
  }
}
