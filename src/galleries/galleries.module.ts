import { Module } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { GalleriesController } from './galleries.controller';
import { PrismaService } from 'src/prisma.service';
import { PhotosService } from 'src/photos/photos.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [GalleriesController],
  providers: [GalleriesService, PrismaService, PhotosService, AppService],
})
export class GalleriesModule {}
