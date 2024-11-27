import { Module } from '@nestjs/common';
import { LandingPageService } from './landing_page.service';
import { LandingPageController } from './landing_page.controller';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LandingPageController],
  providers: [LandingPageService, AppService, PrismaService],
})
export class LandingPageModule {}
