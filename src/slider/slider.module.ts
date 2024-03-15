import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { PrismaService } from 'src/prisma.service';
import { PhotosService } from 'src/photos/photos.service';

@Module({
  controllers: [SliderController],
  providers: [SliderService, PrismaService, PhotosService],
})
export class SliderModule {}
