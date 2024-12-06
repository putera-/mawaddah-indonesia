import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [BlogsController],
    providers: [BlogsService, AppService, PrismaService],
})
export class BlogsModule { }
