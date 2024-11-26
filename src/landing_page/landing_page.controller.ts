import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandingPageService } from './landing_page.service';
import { CreateLandingPageDto } from './dto/create-landing_page.dto';
import { UpdateLandingPageDto } from './dto/update-landing_page.dto';

@Controller('landing-page')
export class LandingPageController {
  constructor(private readonly landingPageService: LandingPageService) {}

//   @Post()
//   create(@Body() createLandingPageDto: CreateLandingPageDto) {
//     return this.landingPageService.create(createLandingPageDto);
//   }

  @Get()
  getLandingPage() {
    return this.landingPageService.getAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.landingPageService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateLandingPageDto: UpdateLandingPageDto) {
//     return this.landingPageService.update(+id, updateLandingPageDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.landingPageService.remove(+id);
//   }
}
