import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';
import { PhotosService } from 'src/photos/photos.service';

@Module({
    controllers: [BlogsController],
    providers: [BlogsService, AppService, PrismaService, PhotosService],
})
export class BlogsModule { }
