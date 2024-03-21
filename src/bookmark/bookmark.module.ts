import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [BookmarkController],
    providers: [BookmarkService, UsersService, PrismaService, AppService],
})
export class BookmarkModule {}
