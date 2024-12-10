import { Module } from '@nestjs/common';
import { LandingPageService } from './landing_page.service';
import { LandingPageController } from './landing_page.controller';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';
import { PhotosService } from 'src/photos/photos.service';

@Module({
    controllers: [LandingPageController],
    providers: [LandingPageService, AppService, PrismaService, PhotosService],
})
export class LandingPageModule { }
