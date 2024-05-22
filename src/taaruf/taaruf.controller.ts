import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaarufService } from './taaruf.service';
import { CreateTaarufDto } from './dto/create-taaruf.dto';
import { UpdateTaarufDto } from './dto/update-taaruf.dto';

@Controller('taaruf')
export class TaarufController {
  constructor(private readonly taarufService: TaarufService) {}

  @Post()
  create(@Body() createTaarufDto: CreateTaarufDto) {
    return this.taarufService.create(createTaarufDto);
  }

  @Get()
  findAll() {
    return this.taarufService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taarufService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaarufDto: UpdateTaarufDto) {
    return this.taarufService.update(+id, updateTaarufDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taarufService.remove(+id);
  }
}
