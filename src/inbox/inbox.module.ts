import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [InboxController],
    providers: [InboxService, UsersService, PrismaService, AppService],
})
export class InboxModule { }
