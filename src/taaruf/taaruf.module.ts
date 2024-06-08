import { Module } from '@nestjs/common';
import { TaarufService } from './taaruf.service';
import { TaarufController } from './taaruf.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [TaarufController],
    providers: [TaarufService, PrismaService, UsersService, AppService],
})
export class TaarufModule {}
