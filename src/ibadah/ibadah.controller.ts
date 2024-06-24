import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IbadahService } from './ibadah.service';
import { CreateIbadahDto } from './dto/create-ibadah.dto';
import { UpdateIbadahDto } from './dto/update-ibadah.dto';

@Controller('ibadah')
export class IbadahController {
  constructor(private readonly ibadahService: IbadahService) {}

  @Post()
  create(@Body() createIbadahDto: CreateIbadahDto) {
    return this.ibadahService.create(createIbadahDto);
  }

  @Get()
  findAll() {
    return this.ibadahService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ibadahService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIbadahDto: UpdateIbadahDto) {
    return this.ibadahService.update(+id, updateIbadahDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ibadahService.remove(+id);
  }
}
