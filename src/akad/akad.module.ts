import { Module } from '@nestjs/common';
import { AkadService } from './akad.service';
import { AkadController } from './akad.controller';
import { PrismaService } from 'src/prisma.service';
import { InboxService } from 'src/inbox/inbox.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [AkadController],
    providers: [AkadService, PrismaService, InboxService, UsersService, AppService],
})
export class AkadModule { }
