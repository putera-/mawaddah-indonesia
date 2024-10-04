import { Module } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { NadharController } from './nadhar.controller';
import { PrismaService } from 'src/prisma.service';
import { InboxService } from 'src/inbox/inbox.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [NadharController],
    providers: [NadharService, PrismaService, InboxService, UsersService, AppService],
})
export class NadharModule { }
