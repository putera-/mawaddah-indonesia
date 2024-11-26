import { Module } from '@nestjs/common';
import { LandingPageService } from './landing_page.service';
import { LandingPageController } from './landing_page.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [LandingPageController],
  providers: [LandingPageService, AppService],
})
export class LandingPageModule {}
