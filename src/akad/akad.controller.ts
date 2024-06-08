import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AkadService } from './akad.service';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';

@Controller('akad')
export class AkadController {
  constructor(private readonly akadService: AkadService) {}

  @Post()
  create(@Body() createAkadDto: CreateAkadDto) {
    return this.akadService.create(createAkadDto);
  }

  @Get()
  findAll() {
    return this.akadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.akadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAkadDto: UpdateAkadDto) {
    return this.akadService.update(+id, updateAkadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.akadService.remove(+id);
  }
}
