import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandingPageService } from './landing_page.service';

@Controller('landing-page')
export class LandingPageController {
  constructor(private readonly landingPageService: LandingPageService) {}


  @Get()
  getLandingPage() {
    return this.landingPageService.getAll();
  }


}
