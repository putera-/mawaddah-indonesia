import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarriagePreparationService } from './marriage_preparation.service';
import { CreateMarriagePreparationDto } from './dto/create-marriage_preparation.dto';
import { UpdateMarriagePreparationDto } from './dto/update-marriage_preparation.dto';

@Controller('marriage-preparation')
export class MarriagePreparationController {
  constructor(private readonly marriagePreparationService: MarriagePreparationService) {}

  @Post()
  create(@Body() createMarriagePreparationDto: CreateMarriagePreparationDto) {
    return this.marriagePreparationService.create(createMarriagePreparationDto);
  }

  @Get()
  findAll() {
    return this.marriagePreparationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marriagePreparationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarriagePreparationDto: UpdateMarriagePreparationDto) {
    return this.marriagePreparationService.update(+id, updateMarriagePreparationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marriagePreparationService.remove(+id);
  }
}
