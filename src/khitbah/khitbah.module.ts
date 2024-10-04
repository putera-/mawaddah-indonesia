import { Module } from '@nestjs/common';
import { KhitbahService } from './khitbah.service';
import { KhitbahController } from './khitbah.controller';
import { PrismaService } from 'src/prisma.service';
import { InboxService } from 'src/inbox/inbox.service';
import { AppService } from 'src/app.service';
import { UsersService } from 'src/users/user.service';

@Module({
    controllers: [KhitbahController],
    providers: [KhitbahService, PrismaService, InboxService, UsersService, AppService],
})
export class KhitbahModule { }
