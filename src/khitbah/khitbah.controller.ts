import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KhitbahService } from './khitbah.service';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';
import { UpdateKhitbahDto } from './dto/update-khitbah.dto';

@Controller('khitbah')
export class KhitbahController {
  constructor(private readonly khitbahService: KhitbahService) {}

  @Post()
  create(@Body() createKhitbahDto: CreateKhitbahDto) {
    return this.khitbahService.create(createKhitbahDto);
  }

  @Get()
  findAll() {
    return this.khitbahService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.khitbahService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKhitbahDto: UpdateKhitbahDto) {
    return this.khitbahService.update(+id, updateKhitbahDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.khitbahService.remove(+id);
  }
}
