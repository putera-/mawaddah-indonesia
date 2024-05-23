import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';

@Controller('nadhar')
export class NadharController {
  constructor(private readonly nadharService: NadharService) {}

//ini kalo gaada taaruf ya gabisa kerja dong bang

  @Post()
  create(@Body() createNadharDto: CreateNadharDto) {
    return this.nadharService.create(createNadharDto);
  }

  @Patch(':id')
  updateDate(@Param('id') id: string, @Body() updateNadharDto: UpdateNadharDto) {
    return this.nadharService.updateDate(id, updateNadharDto);
  }

  @Patch(':id')
  cancel(@Param('id') id: string, @Body() updateNadharDto: UpdateNadharDto) {
    return this.nadharService.cancel(id, updateNadharDto);
  }

  @Patch(':id')
  approve(@Param('id') id: string, @Body() updateNadharDto: UpdateNadharDto) {
    return this.nadharService.approve(id, updateNadharDto);
  }

  @Patch(':id')
  reject(@Param('id') id: string, @Body() updateNadharDto: UpdateNadharDto) {
    return this.nadharService.reject(id, updateNadharDto);
  }


}
